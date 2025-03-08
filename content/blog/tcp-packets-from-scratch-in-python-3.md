---
title: How to build TCP packets from scratch in Python 3
description: After not being able to find a simple solution to calculate the checksum for a TCP packet in Python, I decided to write one myself (not without some help)

date: 2020-01-07T22:40:43Z
---

One of the assignments I got at my university’s IT Security classes was to write a small Python script that would create and send an empty TCP packet with specified flags to the desired host and port combo. This could be easily achieved with _scapy_, but here’s the catch — we weren’t allowed to use external dependencies for this assignment.

Building the packet itself didn’t cause problems, but checksum did. I searched the entire WWW to find answers, but the only thing I found was some spaghetti code that didn’t work (at least in Python 3). So I decided to tear down _scapy_ and create a lightweight solution to this exact issue.

Let’s get down to business!

## Building the packet

Let’s create a class `TCPPacket`, which will hold all the needed packet fields. I will omit the options and data fields.

```py
class TCPPacket:
    def __init__(self,
                 src_host:  str,
                 src_port:  int,
                 dst_host:  str,
                 dst_port:  int,
                 flags:     int = 0):
        self.src_host = src_host
        self.src_port = src_port
        self.dst_host = dst_host
        self.dst_port = dst_port
        self.flags = flags
```

Let’s define the `build` function that will take those fields and encode them into a long bytes sequence.

```py
def build(self) -> bytes:
    packet = struct.pack(
        '!HHIIBBHHH',
        self.src_port,  # Source Port
        self.dst_port,  # Destination Port
        0,              # Sequence Number
        0,              # Acknoledgement Number
        5 << 4,         # Data Offset
        self.flags,     # Flags
        8192,           # Window
        0,              # Checksum (initial value)
        0               # Urgent pointer
    )
```

Here, I use [the built-in module `struct`](https://docs.python.org/3/library/struct.html). Notice how the Data Offset field is offset (no pun intended) by four bits — this is done because, [according to the TCP spec](https://www.rfc-editor.org/rfc/rfc793#section-3.1), it only takes the first four bits of the byte, while the rest is reserved.

The Checksum field should be left at 0 for now, since it will be calculated later. The other constant parameters can be changed to your liking.

## Calculating the checksum

We start by composing a function that will calculate our checksum. The spec tells us the following:

> The checksum field is the 16 bit one’s complement of the one’s complement sum of all 16 bit words in the header and text.

I don’t know about you, but I didn’t understand it even after I’ve read it for the twentieth time. So instead I referred to _scapy_’s source code and this is what I’ve composed:

```py
def chksum(packet: bytes) -> int:
    if len(packet) % 2 != 0:
        packet += b'\0'

    res = sum(array.array("H", packet))
    res = (res >> 16) + (res & 0xffff)
    res += res >> 16

    return (~res) & 0xffff
```

This method makes use of Python’s built-in `array` module, that creates an array with fixed element types. This lets us calculate the sum of 16-bit words more easily than using a loop. Then the function simply applies some bit arithmetic magic to the sum and returns it.

Before we can apply this method to our packet, we need to prepend it with a pseudo-header, that contains extra information, such as IP Addresses and TCP Length. Let’s head back to the `build()` method and compose the pseudo-header:

```py
pseudo_hdr = struct.pack(
    '!4s4sHH',
    socket.inet_aton(self.src_host),    # Source Address
    socket.inet_aton(self.dst_host),    # Destination Address
    socket.IPPROTO_TCP,                 # PTCL
    len(packet)                         # TCP Length
)
```

Please note that TCP Length should also include the length of data sent with the packet. In our case, the data is empty, so we just use the header length.

After composing the pseudo-header, we only need to calculate the checksum and insert it back into the packet:

```py
checksum = chksum(pseudo_hdr + packet)

packet = packet[:16] + struct.pack('H', checksum) + packet[18:]
```

Make sure that the checksum is inserted using the native byte order and not big-endian; this is why there is no exclamation point in the first argument of `struct.pack()`.

In my example, I simply cut the packet in between and insert the checksum. You can also build the packet from scratch using three consecutive `struct.pack` calls.

The packet is finished, don’t forget to return it:

```py
return packet
```

## Sending the packet

Now let’s make use of the class we just made and send a TCP Packet. For example, this is how we would create a Christmas Tree Packet (a packet with `FIN`, `URG` and `PSH` flags):

```py
dst = '192.168.1.1'

pak = TCPPacket(
    '192.168.1.42',
    20,
    dst,
    666,
    0b000101001  # Merry Christmas!
)
```

To send this packet, we need to create a socket connection using the TCP protocol:

```py
s = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_TCP)
```

This will add the required IP header for us, so we don’t need to bother building it ourselves.

And finally, we send the built packet using the `sendto()` method:

```py
s.sendto(pak.build(), (dst, 0))
```

---

The full code (licensed under the GNU GPL 3.0) is [available as a GitHub Gist](https://gist.github.com/kytta/b06520e3cb458ac7264cab1c51fa33d6). In conclusion, I’d like to thank the developers of [_scapy_](https://scapy.net/) for being my, umm, 'inspiration' ;)
