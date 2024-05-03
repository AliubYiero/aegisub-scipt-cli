/**
 * 参数归一化, 将文件名参数变成有后缀的形式
 *
 * @param {string} filename
 * @return {string}
 *
 * @example
 * normalizeFileNameParameters( 'file.lua' )    // -> file.lua
 * normalizeFileNameParameters( 'file' )        // -> file.lua
 * */
const normalizeFileNameParameters = ( filename ) => {
	if ( !filename.endsWith( '.lua' ) ) {
		return `${ filename }.lua`;
	}
	return filename;
};

module.exports = {
	normalizeFileNameParameters,
};
