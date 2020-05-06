Discord RFC bot
===============

A small discord RFC bot that responds when you say an RFC. For example if you send a message:

::

  I really love RFC1149!

The bot would match this message using regex and get out

.. code-block:: js

  [ 'RFC1149', index: 0, input: 'RFC1149', groups: undefined ]

The bot would then use this and send a ``GET`` request to ``https://www.ietf.org/rfc/rfc1149.json``.
The response JSON would be parsed, and return the following embed

.. image:: screenshot.png
