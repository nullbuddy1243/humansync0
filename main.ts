import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface HumanSync0Settings {
	mySetting: string;
	humanSync: number;
}

const DEFAULT_SETTINGS: HumanSync0Settings = {
	mySetting: 'default',
	humanSync: 0,
}


export default class HumanSync0 extends Plugin {
	settings: HumanSync0Settings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		// icons -> https://lucide.dev/
		const ribbonIconEl = this.addRibbonIcon('arrow-up-right', 'HS0 Upload', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('0_0 =+');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('HumanSync0');

		// command that opens a simple modal
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'HS0 Modal Simple',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		
		// adds command that inserts current ISO datetime string at current cursor position
		// https://marcus.se.net/obsidian-plugin-docs/editor#insert-text-at-cursor-position

		this.addCommand({
			id: 'humansync0-insert-iso-datetime-string',
			name: 'HS0: Insert ISO Datetime string.',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				// replaceRange params: string to insert, start position, optional end position
				// if no end position, just inserts at that start position
				// if given editor.getCursor() will insert the string at current cursor position
				editor.replaceRange(new Date().toISOString(), editor.getCursor())
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new HumanSync0SettingsTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('hs0 click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class HumanSync0SettingsTab extends PluginSettingTab {
	plugin: HumanSync0;

	constructor(app: App, plugin: HumanSync0) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'HS0 setting'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
