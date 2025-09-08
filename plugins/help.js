
const axios = require("axios");

module.exports = {
  config: {
    name: 'help',
    aliases: ['commands', 'menu'],
    permission: 0,
    prefix: true,
    description: 'Lists all available commands by category.',
    category: 'Utility',
    credit: 'Developed by Mohammad Nayan',
    usages: ['help', 'help [command name]'],
  },

  start: async ({ event, api, args, loadcmd }) => {
    const { threadId } = event;

    const getAllCommands = () => loadcmd.map((plugin) => plugin.config);
    const commands = getAllCommands();

    
    const mergedCategories = {
      "🛡️ Bot Control": ["Administration", "Admin", "Owner", "Bot Management", "System"],
      "🛠️ Utility": ["Utility", "Utilities", "system"],
      "🎬 Media": ["Media", "media", "video", "image"],
      "👥 Group Management": ["Group Management", "group"],
      "🤖 AI": ["AI", "AI Chat"],
      "🎉 Fun": ["Fun", "Games", "greetings"],
      "🔧 Tools": ["Tools", "Information"]
    };

    const categories = {};

    commands.forEach((cmd) => {
      let cat = cmd.category || cmd.categorie || cmd.categories || "📦 Uncategorized";

      
      for (const merged in mergedCategories) {
        if (mergedCategories[merged].includes(cat)) {
          cat = merged;
          break;
        }
      }

      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd);
    });

    
    if (args[0]) {
      const command = commands.find((cmd) => cmd.name.toLowerCase() === args[0].toLowerCase());
      if (command) {
        await api.sendMessage(threadId, {
          text: `╭━━━〔 *📖 Command Info* 〕━━━╮
┃ 🔹 Name: ${command.name}
┃ 🔹 Aliases: ${command.aliases.join(", ") || "None"}
┃ 🔹 Version: ${command.version || "1.0.0"}
┃ 🔹 Description: ${command.description || "No description"}
┃ 🔹 Usage: ${command.usage ? command.usage : command.usages.join("\n┃   ")}
┃ 🔹 Permissions: ${command.permission}
┃ 🔹 Category: ${command.category || "Uncategorized"}
┃ 🔹 Credits: ${command.credits || command.credit || "Mohammad Nayan"}
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
        });
      } else {
        await api.sendMessage(threadId, { text: `⚠️ No command found with the name "${args[0]}".` });
      }
      return;
    }

    
    let responseText = `
╔══════════════════════╗
     ✨ *${global.config.botName || 'WhatsApp Bot'}* ✨
╚══════════════════════╝

👑 Owner: ${global.config.botOwner || 'Unknown Owner'}
`;

    
    for (const category in categories) {
      const categoryCommands = categories[category]
        .map(cmd => `   ⤷ ${global.config.PREFIX}${cmd.name}`)
        .join("\n");

      responseText += `

╔══════════════════════╗
📂 *${category}*
${categoryCommands}
╚══════════════════════╝
`;
    }

    try {
      
      const response = await axios.get(global.config.helpPic, {
        responseType: 'stream'
      });

      await api.sendMessage(threadId, {
        image: { stream: response.data },
        caption: responseText
      });
    } catch (error) {
      console.error('❌ Error fetching image:', error.message);
      await api.sendMessage(threadId, { text: responseText });
    }
  },
};
