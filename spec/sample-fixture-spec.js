const path = require("path");

// The fixture beside this file is a plain sample of the language — the file to
// open when you want to look at the highlighting rather than assert on it. This
// spec is only what stops the sample quietly rotting: the grammar still claims
// it, and it still tokenizes.

describe("Diff sample fixtures", () => {
  beforeEach(async () => {
    await lumine.packages.activatePackage("language-diff");
    lumine.config.set("editor.useTreeSitterParsers", true);
  });

  it("parses sample.diff without error", async () => {
    const editor = await lumine.workspace.open(path.join(__dirname, "fixtures", "sample.diff"));
    const languageMode = editor.getBuffer().getLanguageMode();
    await languageMode.ready;

    expect(editor.getGrammar().scopeName).toBe("source.diff");
    expect(languageMode.tree.rootNode.hasError).toBe(false);
  });
});
