describe("Diff Tree-sitter grammar", () => {
  beforeEach(async () => {
    await lumine.packages.activatePackage("language-diff");
  });

  it("highlights additions and deletions", async () => {
    const editor = await lumine.workspace.open("sample.diff");
    editor.setText("- line 1\n+ line 2\n");
    await editor.languageMode.ready;

    expect(editor.getGrammar().scopeName).toBe("source.diff");
    expect(editor.scopeDescriptorForBufferPosition([0, 1]).getScopesArray()).toContain(
      "markup.deleted.diff",
    );
    expect(editor.scopeDescriptorForBufferPosition([1, 1]).getScopesArray()).toContain(
      "markup.inserted.diff",
    );
  });

  it("is injected into Markdown diff code blocks", async () => {
    await lumine.packages.activatePackage("language-gfm");
    const editor = await lumine.workspace.open("sample.md");
    editor.setText("```diff\n- line 1\n+ line 2\n```\n");
    await editor.languageMode.ready;

    expect(editor.scopeDescriptorForBufferPosition([1, 1]).getScopesArray()).toContain(
      "markup.deleted.diff",
    );
    expect(editor.scopeDescriptorForBufferPosition([2, 1]).getScopesArray()).toContain(
      "markup.inserted.diff",
    );
  });
});
