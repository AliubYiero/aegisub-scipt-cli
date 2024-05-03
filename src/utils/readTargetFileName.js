const { parseTerminalPath } = require( './parseTerminalPath' );
const { getTargetFilePath } = require( './getTargetFilePath' );
const { basename } = require( 'path' );
/**
 * 读取输入的文件名
 *
 * @param {import('yargs').Arguments<T>} argv
 * */
const readTargetFileName = ( argv ) => {
	// 获取原始路径
	const filePath = parseTerminalPath( argv.filepath );
	// 获取目标路径
	const targetPath = getTargetFilePath( basename( filePath ) );
	
	return targetPath;
};

module.exports = {
	readTargetFileName,
};
