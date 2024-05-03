const globalConfig = require( '../../../config/globalConfig.json' );
const { chain } = require( 'radash' );
const { dirname, resolve } = require( 'path' );
const { writeJSONSync } = require( 'fs-extra' );
const prompts = require( 'prompts' );

/**
 * 解析 AegisubPath.
 *
 * 如果存在 .exe 后缀, 则提取出其目录, 否则直接返回
 *
 * @param {string} aegisubPath
 * @return {string}
 * */
const parseAegisubPath = ( aegisubPath ) => {
	if ( aegisubPath.endsWith( '.exe' ) ) {
		return dirname( aegisubPath );
	}
	return aegisubPath;
};

/**
 * 解析 config list 指令
 *
 * @param {import('yargs').Argv<T>} yargsController
 * @return {import('yargs').Argv<T>}
 * */
function parseConfigList( yargsController ) {
	return yargsController
		.command(
			'config list',
			'展示当前所有管理的 aegisub 地址.',
			( yargs ) => {
				return yargs;
			},
			( argv ) => {
				console.log( `
${ '[Aegisub List]'.blue }
- ${ globalConfig.aegisubList.map( item => item.cyan ).join( '\n' ) }
` );
			},
		);
}

/**
 * 解析 config set 指令
 *
 * @param {import('yargs').Argv<T>} yargsController
 * @return {import('yargs').Argv<T>}
 * */
function parseConfigSet( yargsController ) {
	return yargsController
		.command(
			'config set [aegisub_path]',
			'添加 [aegisub_path] 到管理列表中, 并激活.',
			( yargs ) => {
				return yargs;
			},
			( argv ) => {
				// 解析 aegisub_path 路径
				const aegisubPath = parseAegisubPath( argv.aegisub_path );
				
				// 查找当前 aegisubPath 是否存在于配置中
				// 如果不存在, 则写入到路径中
				if ( !globalConfig.aegisubList.includes( aegisubPath ) ) {
					globalConfig.aegisubList.push( aegisubPath );
				}
				
				// 写入当前激活的aeg
				globalConfig.activeAegisub = aegisubPath;
				
				// 重新写入新配置
				writeJSONSync( resolve( __dirname, '../../../config/globalConfig.json' ), globalConfig, { spaces: '\t' } );
				
				// 写入成功信息
				console.log( `${ aegisubPath.cyan.underline } 已成功添加并应用到管理列表中...` );
			},
		);
}

/**
 * 解析 config use 指令
 *
 * @param {import('yargs').Argv<T>} yargsController
 * @return {import('yargs').Argv<T>}
 * */
function parseConfigUse( yargsController ) {
	return yargsController.command(
		'config use',
		'切换当前激活的 aegisub 的管理状态.',
		( yargs ) => {
			return yargs;
		},
		() => {
			// 解析 aegisub_path 路径
			const aegisubPath = parseAegisubPath( argv.aegisub_path );
			
			// 查找当前 aegisubPath 是否存在于配置中
			// 如果存在, 则直接退出
			if ( globalConfig.aegisubList.includes( aegisubPath ) ) {
				return;
			}
			
			// 将当前 aegisub 路径添加到管理列表中
			globalConfig.aegisubList.push( aegisubPath );
			
			// 重新写入新配置
			writeJSONSync( resolve( __dirname, '../../../config/globalConfig.json' ), globalConfig, { spaces: '\t' } );
			
			// 写入成功信息
			console.log( `${ aegisubPath.cyan.underline } 已成功添加到管理列表中...` );
		} );
}

/**
 * 解析 config add 指令
 *
 * @param {import('yargs').Argv<T>} yargsController
 * @return {import('yargs').Argv<T>}
 * */
function parseConfigAdd( yargsController ) {
	return yargsController.command(
		'config add [aegisub_path]',
		'添加 [aegisub_path] 到管理列表中.',
		( yargs ) => {
			return yargs;
		},
		async () => {
			
			// 获取将要删除的 Aeg 名
			const willDeleteAegName = globalConfig.aegisubList.find( ( _, index ) => index === result.aegisubIndex );
			
			// 切换激活 Aegisub
			globalConfig.aegisubList = globalConfig.aegisubList.filter( ( _, index ) => index !== result.aegisubIndex );
			
			// 写入新配置
			writeJSONSync( resolve( __dirname, '../../../config/globalConfig.json' ), globalConfig, { spaces: '\t' } );
			
			// 写入成功信息
			console.log( `${ willDeleteAegName.cyan.underline } 已经成功从管理列表中删除...` );
		} );
}

/**
 * 解析 config remove 指令
 *
 * @param {import('yargs').Argv<T>} yargsController
 * @return {import('yargs').Argv<T>}
 * */
function parseConfigRemove( yargsController ) {
	return yargsController.command(
		'config remove',
		'取消对应 aegisub 的管理.',
		( yargs ) => {
			return yargs;
		},
		async () => {
			// 进行用户选择
			const result = await prompts( {
				type: 'select',
				name: 'aegisubIndex',
				message: '切换激活的 Aegisub 目录',
				choices: globalConfig.aegisubList.map( ( aeg, index ) => ( {
					title: aeg,
					disabled: globalConfig.activeAegisub === aeg,
					value: index,
				} ) ),
				initial: globalConfig.aegisubList.findIndex( aeg => aeg !== globalConfig.activeAegisub ),
				warn: '不能删除激活中的 Aegisub 的管理状态.',
			} );
			
			// 获取将要删除的 Aeg 名
			const willDeleteAegName = globalConfig.aegisubList.find( ( _, index ) => index === result.aegisubIndex );
			
			// 切换激活 Aegisub
			globalConfig.aegisubList = globalConfig.aegisubList.filter( ( _, index ) => index !== result.aegisubIndex );
			
			// 写入新配置
			writeJSONSync( resolve( __dirname, '../../../config/globalConfig.json' ), globalConfig, { spaces: '\t' } );
			
			// 写入成功信息
			console.log( `${ willDeleteAegName.cyan.underline } 已经成功从管理列表中删除...` );
		} );
}

/**
 * 解析 config 指令
 *
 * @param {import('yargs').Argv<T>} yargsController
 * @return {import('yargs').Argv<T>}
 * */
const parseConfig = chain(
	parseConfigList,
	parseConfigSet,
	parseConfigUse,
	parseConfigAdd,
	parseConfigRemove,
);

module.exports = {
	parseConfig,
};
