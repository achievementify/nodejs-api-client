## Achievementify Node.js client

Node.js client library for accessing [Achievementify](https://achievementify.com) API

## Installation

Install through [npm](https://www.npmjs.com/):

```shell
npm install --save axios @achievementify/client
```

## Usage

```javascript
import { AchievementifyClient } from "@achievementify/client";

const client = new AchievementifyClient("<CLIENT_SECRET>");

app.post("/posts", (req, res) => {
  /* your post creation logic */

  client.trigger({
    userId: req.session.passport.user,
    achievementId: "<ACHIEVEMENT_ID>",
  });

  /* other code */
});
```

## Documentation

Read the full API documentation, please review the [API Docs](https://achievementify.com/docs).

## License

[MIT](LICENSE) &copy; [Achievementify](https://achievementify.com)
