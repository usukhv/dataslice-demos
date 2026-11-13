# Messenger webhook

- `workflow.json`: Webhook (GET ба POST), Meta-гийн шалгалт (`hub.challenge`), 200 хариу, мессеж ялгах, Shop Brain дуудах, Send API-аар хариу илгээх

Import: **...** > **Import** > **From file**. 6-р хичээлийн Shop Brain бэлэн байх ёстой.
PLACEHOLDER: **Verify token OK?** node-ийн `YOUR_VERIFY_TOKEN`-ийг урт санамсаргүй үгээр соль. Meta app-ийн Verify Token-д яг ижлийг бич.
**Send to Messenger** node: **Query Auth** credential үүсгэ, Name = `access_token`, Value = Page access token. URL дахь `v27.0`-ийг Meta-гийн одоогийн хувилбартай тулга.
Publish хийгээд Webhook-ийн **Production URL**-ийг Meta app-ийн Callback URL-д тавь.
