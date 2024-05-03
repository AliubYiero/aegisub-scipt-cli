# Aegisub Script Cli

Aegisub 脚本加载器. 实现通过命令行将控制 Aegisub 的脚本, 实现脚本的本地安装 / 远程安装 / 软卸载 / 软加载 / 卸载.

## 更新计划

**已实现**

- 通过 `aeg i <filepath>`  指令安装本地脚本
- 通过 `aeg i <filepath> -w` / `aeg i <filepath> --watch` 指令实现本地脚本持续监听/安装
- 通过 `aegisub i <filepath> -k <HotKey>` / `aegisub i <filepath> --hotkey <HotKey>` 指令实现安装脚本的同时, 绑定上热键. 

**待实现**

**Aeg install**

- [ ] 通过 `aeg i <filepath>` 可以下载远程的脚本
- [ ] 通过 `aeg i <filepath> --target <autoload/include>`  可以切换添加到哪个域中, 默认为 `--target autoload`

**Aeg uninstall**

- [ ] 通过 `aeg ui <filepath>` 可以卸载脚本 (包括快捷键)

**Aeg list**

- [ ] 通过 `aeg ls` 可以展示当前所有的脚本(以及其介绍)
- [ ] 通过 `aeg ls --unload` 可以展示将当前所有处于软卸载状态的脚本 (以及其介绍)

**Aeg load**

- [ ] 通过 `aeg load <filename>` 可以将处于软卸载状态的脚本复制到当前 aeg (保留备份)
- [ ] 通过 `aeg load <filename> -f` / `aeg load <filename> --focus` 可以将处于软卸载状态的脚本移动到当前 aeg (不保留备份)

**Aeg unload**

- [ ] 通过 `aeg unload <filename>` 可以将当前 aeg 激活的脚本移动到软卸载区域中. 

**Aeg Config**

- [ ] 通过 `aeg config add <aegisub.exe path>` 指令添加本地 aegisub

- [ ] 通过 `aeg config show` / `aeg config list` 指令展示当前已经添加的所有 aeg

- [ ] 通过 `aeg config remove` 指令移除某个 aeg. (输入当前指令后, 出现一个单选列表)

- [ ] 通过 `aeg use` 可以切换当前激活的 aeg (出现单选框)
