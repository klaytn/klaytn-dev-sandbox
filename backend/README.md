= KIP 37 Token Standard

[.readme-notice]
NOTE: This document is better viewed at https://kips.klaytn.com/KIPs/kip-37

A standard interface for contracts that manage multiple token types. A single deployed contract may include any combination of fungible tokens, non-fungible tokens or other configurations (e.g. semi-fungible tokens)

The EIP consists of three interfaces which fulfill different roles, found here as {IKIP37}, {IKIP37MetadataURI} and {IKIP37Receiver}.

{KIP37} implements the mandatory {IKIP37} interface, as well as the optional extension {IKIP37MetadataURI}.

== Core

{{IKIP37}}

{{IKIP37MetadataURI}}

{{KIP37}}

{{IKIP37Receiver}}

{{KIP37Token}}