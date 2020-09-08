require('dotenv').config()

const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const axios = require("axios");

const translate = require("translate-google");
const { default: Axios } = require("axios");

// bot.help((ctx) => ctx.replyWithPhoto({ url: "/Users/catdev/Desktop/projects/telegram_translate/123.png" }));
// let count = 2;
// setInterval(() => {
//   count *= 2;
//   bot.telegram.sendMessage(-1001269208500, count);
//   console.log(count);
// }, 2000);

bot.on("text", async (ctx) => {
  console.log(ctx.message.text);
  try {
    if (ctx.message.text.split(" ").slice(-1)[0] === "e") {
      const data = await translate(ctx.message.text.replace(" e", " "), {
        to: "en",
      });
      return ctx.reply(data);
    } else if (ctx.message.text.split(" ").slice(-1)[0] === "r") {
      const data = await translate(ctx.message.text.replace(" r", " "), {
        to: "ru",
      });
      return ctx.reply(data);
    } else if (ctx.message.text.split(" ").slice(-1)[0] === "v") {
      const data = await translate(ctx.message.text.replace(" v", " "), {
        to: "vi",
      });
      return ctx.reply(data);
    } else if (ctx.message.text.split(" ").slice(-1)[0] === "a") {
      const data = await translate(ctx.message.text.replace(" a", " "), {
        to: "ar",
      });
      return ctx.reply(data);
    } else if (ctx.message.text.split(" ").slice(-1)[0] === "t") {
      const data = await translate(ctx.message.text.replace(" t", " "), {
        to: "tr",
      });
      return ctx.reply(data);
    } else if (ctx.message.text.split(" ")[0] === "get") {
      try {
        const { data } = await axios.get(ctx.message.text.split(" ")[1]);
        return ctx.reply(JSON.stringify(data).substring(0, 2000));
      } catch (err) {
        return ctx.reply("error GET");
      }
    } else if (ctx.message.text.split(" ")[0] === "post") {
      try {
        console.log(ctx.message.text.split(" ")[2]);
        const { data } = await axios.post(
          ctx.message.text.split(" ")[1],
          JSON.parse(ctx.message.text.split(" ")[2])
        );

        return ctx.reply(JSON.stringify(data).substring(0, 2000));
      } catch (err) {
        return ctx.reply("error POST");
      }
    } else {
      try {
        const data = await translate(
          ctx.message.text.replace(
            ` ${ctx.message.text.split(" ").slice(-1)[0]}`,
            " "
          ),
          {
            to: ctx.message.text.split(" ").slice(-1)[0],
          }
        );
        console.log(ctx.message.from.username);
        console.log(ctx.message.chat.id);
        return ctx.reply(data);
      } catch (err) {}
    }
  } catch (err) {
    console.log(err);
    return ctx.reply("error");
  }
});

bot.launch();
