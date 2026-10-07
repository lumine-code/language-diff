describe("Diff upstream parser regressions", () => {
  let editor;

  beforeEach(async () => {
    await lumine.packages.activatePackage("language-diff");
    editor = await lumine.workspace.open();
    editor.setGrammar(lumine.grammars.grammarForScopeName("source.diff"));
  });

  afterEach(() => editor?.destroy());

  it("parses and highlights both sides of a Git binary patch", async () => {
    editor.setText(
      "diff --git a/test.bin b/test.bin\n" +
        "index 6a635bd..524932a 100644\n" +
        "GIT binary patch\nliteral 4\nLcmZQzU|;|M00aO5\n\n" +
        "literal 0\nHcmV?d00001\n\n",
    );
    expect(await editor.whenGrammarSettled()).toBe(true);
    const root = editor.getSyntaxNodeAtBufferPosition([0, 0], (node) => !node.parent);
    expect(root.hasError).toBe(false);
    expect(root.descendantsOfType("binary_patch").length).toBe(1);
    expect(editor.scopeDescriptorForBufferPosition([4, 0]).getScopesArray()).toContain(
      "markup.inserted.diff",
    );
    expect(editor.scopeDescriptorForBufferPosition([7, 0]).getScopesArray()).toContain(
      "markup.deleted.diff",
    );
  });

  it("parses normal diff change markers and directional lines", async () => {
    editor.setText("1c1\n< old\n---\n> new\n");
    expect(await editor.whenGrammarSettled()).toBe(true);
    const root = editor.getSyntaxNodeAtBufferPosition([0, 0], (node) => !node.parent);
    expect(root.hasError).toBe(false);
    expect(editor.scopeDescriptorForBufferPosition([1, 2]).getScopesArray()).toContain(
      "markup.deleted.diff",
    );
    expect(editor.scopeDescriptorForBufferPosition([3, 2]).getScopesArray()).toContain(
      "markup.inserted.diff",
    );
  });
});
