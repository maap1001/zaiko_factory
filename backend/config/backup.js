const { exec } = require('child_process');
require('dotenv').config();

exports.backupDatabase = async () => {
    const zaiko = 'Admylibe'; 
    const outputPath = './backup'; // Debes crear esta carpeta en la raíz de tu proyecto

    const command = `mongodump --uri "${process.env.MONGO_URI}" --out ${outputPath} --gzip`;

    await exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error en el respaldo: ${error.message}`);
            return;
        }
        console.log(`Respaldo completado con éxito: ${stdout}`);
    });
};