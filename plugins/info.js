const os = require('os');

module.exports = {
  config: {
    name: 'info',
    aliases: ['about', 'admininfo', 'serverinfo'],
    permission: 0,
    prefix: 'both',
    categorie: 'Utilities',
    credit: 'Developed by Mohammad Nayan',
    usages: [`${global.config.PREFIX}info - Show admin and server information.`],
  },
  start: async ({ event, api, message }) => {
    try {
      const uptimeSeconds = process.uptime();
      const uptime = new Date(uptimeSeconds * 1000).toISOString().substr(11, 8);

      const adminListText =
        global.config.admin.length > 0
          ? global.config.admin
              .map((id, i) => `${i + 1}. @${id.split('@')[0]}`)
              .join('\n')
          : 'No admins found.';

      const infoMessage = `
--------------------------------------------
𝐍𝐚𝐦𝐞           : 𝐇𝐮𝐬𝐬𝐚𝐢𝐧 𝐀𝐡𝐦𝐞𝐝
𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤       : 𝐇𝐮𝐬𝐬𝐚𝐢𝐧 𝐀𝐡𝐦𝐞𝐝
𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧       : 𝐈𝐬𝐥𝐚𝐦
𝐏𝐞𝐫𝐦𝐚𝐧𝐞𝐧𝐭 𝐀𝐝𝐝𝐫𝐞𝐬𝐬: 𝐒𝐲𝐥𝐡𝐞𝐭, 𝐁𝐞𝐚𝐧𝐢𝐛𝐚𝐳𝐚𝐫
𝐂𝐮𝐫𝐫𝐞𝐧𝐭 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 : 𝐒𝐲𝐥𝐡𝐞𝐭, 𝐁𝐞𝐚𝐧𝐢𝐛𝐚𝐳𝐚𝐫
𝐆𝐞𝐧𝐝𝐞𝐫       : 𝐌𝐚𝐥𝐞
𝐀𝐠𝐞           : 𝟏𝟔+
𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 : 𝐒𝐢𝐧𝐠𝐥𝐞
𝐖𝐨𝐫𝐤         : 𝐒𝐭𝐮𝐝𝐞𝐧𝐭
𝐆𝐦𝐚𝐢𝐥       : x2hussain4x@gmail.com
𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩   : wa.me/+8801965142856
𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦     : 𝐏𝐞𝐫𝐬𝐨𝐧𝐚𝐥
𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤: https://www.facebook.com/profile.php?id=100071009500533

--------------------------------------------
\`\`\`
🖥️ Server Info:
• Platform       : ${os.platform()}
• CPU            : ${os.cpus()[0].model}
• Node.js Version: ${process.version}
• Uptime         : ${uptime}
• Total Memory   : ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
• Free Memory    : ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB
\`\`\``;

      await api.sendMessage(
            event.threadId,
            { image: { url: "https://files.catbox.moe/xiurbv.jpg" }, caption: infoMessage || '' },
            { quoted: event.message }
          );;
    } catch (error) {
      console.error(error);
      await api.sendMessage(event.threadId, '❌ An error occurred while fetching info.', { quoted: event.message });
    }
  },
};
