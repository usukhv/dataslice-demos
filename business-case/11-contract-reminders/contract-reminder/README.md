# Гэрээний хугацааны сануулга (n8n)

- `contracts.csv`: `Гэрээ` табын загвар, 4 жишээ гэрээ.
- `workflow.json`: Schedule Trigger (өдөр бүр 9:00) > Google Sheets (Get Row(s)) > Filter (30 хоногийн дотор дуусах, Хаагдсан биш) > Telegram (Send Message).

1. Google Sheets-д `Гэрээ` таб үүсгэж **File > Import > Upload** хий. **Replace current sheet** сонгоод **Convert text to numbers, dates, and formulas**-ийн чагтыг арилга. Ингэвэл огноо `2026-12-01` текстээрээ үлдэнэ.
2. n8n-д шинэ workflow нээж баруун дээд **...** цэснээс **Import from File** сонгоод `workflow.json`-г оруул.
3. **Get Contracts** node: Google Sheets credential, **Document**-оос хүснэгтээ сонго.
4. **Send Reminder** node: Telegram credential (бот token), **Chat ID**-д `YOUR_CHAT_ID`-ийн оронд өөрийн chat ID.
5. **Execute workflow** дарж турш, ажиллавал **Publish**.

Timezone нь workflow-ийн тохиргоонд `Asia/Ulaanbaatar` гэж орсон. Жинхэнэ token-оо энэ файлд хэзээ ч бүү бич.
