
### Plugin Developer Docs: https://help.obsidian.md/Developers/Build+plugins

- Install dependencies using NPM or Yarn.

```bash
    npm install
```

- Rebuild plugin whenever you edit the code.

```bash
    npm run dev
```

- Install the plugin to your vault.

```bash
    mkdir ~/Documents/humandev/.obsidian/plugins/humansync0
    mv main.js styles.css manifest.json ~/Documents/humandev/.obsidian/plugins/humansync0
```
- Restart Obsidian.

### Obsidian API 

https://github.com/obsidianmd/obsidian-api

### Deeper Plugin Docs

https://marcus.se.net/obsidian-plugin-docs/

obsidian plugin folder path: 
~/Documents/Obsidian\ Vault/.obsidian/plugins/


### move plugin files into vault

after `npm run dev` builds the main.js out of main.ts:

```bash
mv main.js styles.css manifes
t.json ~/Documents/humandev/.obsidian/plugins/humansync0/
```

### backup manifest + styles

manifest.json: 

```json
{
	"id": "humansync0",
	"name": "Human Sync 0",
	"version": "0.0.1",
	"minAppVersion": "0.15.0",
	"description": "",
	"author": "nullbuddy1243",
	"authorUrl": "",
	"fundingUrl": "",
	"isDesktopOnly": false
}
```

styles.css: 

```css
/* */
```