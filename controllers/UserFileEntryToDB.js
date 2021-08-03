const DB = require('../db-config')
const userid = require('./getuserid')

async function fileEntry(user, directory, filesize,filename) {

    let user_id = await userid.userid(user)
    let insertFile = `INSERT INTO user_files (user_id,username,directory,filesize,filename)
    VALUES('${user_id}','${user}','${directory}','${filesize}','${filename}')`
    await DB.executeQuery(insertFile)
}

async function filedelete(user, directory) {

    //deletes the file entry from the table
    let deletefile = `DELETE FROM user_files 
    WHERE username = '${user}' AND directory = '${directory}';`
    await DB.executeQuery(deletefile)


}

async function getFileSize(user, path) {

    let query = `SELECT filesize FROM user_files WHERE username = '${user}' AND directory = '${path}'`
    let result = await DB.executeQuery(query);
    let filesize = result[0].filesize
    return filesize;
}


module.exports = {
    fileEntry: fileEntry,
    filedelete: filedelete,
    getFileSize: getFileSize
}



