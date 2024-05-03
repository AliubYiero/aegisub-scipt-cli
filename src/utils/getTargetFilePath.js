const {
	normalizeFileNameParameters,
} = require( './normalizeFileNameParameters' );
const { join, basename } = require( 'path' );
/**
 *
 * @param {string} filename 需要移动的文件名 (不需要路径, 带路径的需要通过 `path.basename()` 处理)
 * @return {string}
 *
 * @example
 * getTargetFilePath( path.basename( './src/demo.lua' ) )
 * */
const getTargetFilePath = ( filename ) => {
	filename = normalizeFileNameParameters( filename );
	const aegisubExePath = require( '../../config/globalConfig.json' ).activeAegisub;
	return join( aegisubExePath, '/automation/autoload/', basename( filename ) );
};

module.exports = {
	getTargetFilePath,
};
