# Deli is a counter
More specifically, it's generator and recorder of unique, sequential numbers. Think of it as your own infinitely long, ultimately verifiable, excellently customizable roll of deli counter tickets.

## How it works

1. Deli receives a request for a ticket via its api. The request may contain an optional `context` parameter.
2. Deli generates a new ticket which has an index, a timestamp, a context, and a code.
2.1. The index is a global variable which is incremented each time a ticket is requested.
2.2. The timestamp is generated and formatted by moment.js
2.3. The context is a parameter received in the request.
2.4. The code is constructed from the context and the index.
3. The new ticket is recorded to a persistent database, checking that no other tickets with the same index exist.
4. Deli responds to the request with the new ticket formatted as a JSON object and a status code.