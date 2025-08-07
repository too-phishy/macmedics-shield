import express from "express";
import { google } from "googleapis";
import asyncHandler from "express-async-handler";
import { OAuth2Client } from "google-auth-library";
import { processMessage } from "./src/processMessage.js";
import { cardForActiveUser } from "./src/cards/cardForActiveUser.js";
import { cardForInactiveUser } from "./src/cards/cardForInactiveUser.js";

const gmail = google.gmail({ version: "v1" });
// Create and configure the app
const app = express();

// Trust GCPs front end to for hostname/port forwarding
app.set("trust proxy", true);
app.use(express.json());

const CUSTOMER_LIST = new Set(["lydia.stepanek@gmail.com"]);

// Initial route for the add-on
app.post(
  "/",
  asyncHandler(async (req, res) => {
    const currentMessageId = req.body.gmail.messageId;
    const event = req.body;
    const accessToken = event.authorizationEventObject.userOAuthToken;

    const tokenInfo = await new OAuth2Client().getTokenInfo(accessToken);
    const email = tokenInfo.email;

    const activeCustomer = CUSTOMER_LIST.has(email);

    const messageToken = event.gmail.accessToken;
    const auth = new OAuth2Client();
    auth.setCredentials({ access_token: accessToken });

    const gmailResponse = await gmail.users.messages.get({
      id: currentMessageId,
      userId: "me",
      format: "full",
      auth,
      headers: {
        "X-Goog-Gmail-Access-Token": messageToken,
      },
    });
    const messageData = gmailResponse.data;

    const { headers, fullLinkURIs, messageBodies } = await processMessage(
      messageData
    );

    const pushCard = activeCustomer
      ? await cardForActiveUser(
          headers,
          fullLinkURIs,
          messageBodies,
          messageData
        )
      : cardForInactiveUser;
    const renderAction = {
      action: {
        navigations: [
          {
            pushCard,
          },
        ],
      },
    };
    res.json(renderAction);
  })
);

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
