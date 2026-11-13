# Хүнд шилжүүлэх ба яриа бүртгэх

- `workflow.json`: 3-р хичээлийн агент + 2 If (зөвхөн хувийн текст, `[ХҮН]` тэмдэг), эзэн рүү мэдэгдэл, `Conversations` sheet-д Append Row

Import: **...** > **Import** > **From file**. Нэг бот нэг л Telegram Trigger-тэй ажиллана, тиймээс 3-р хичээлийн workflow-оо Unpublish хий.
Солих зүйл: Telegram, Gemini, Google Sheets credential. **Notify owner** node-ийн `OWNER_CHAT_ID`-г эзний группийн chat ID-аар (хасах тэмдэгтэй) соль.
Google Sheets node бүрийн **Document**-д `Shop Bot`-оо сонго.
