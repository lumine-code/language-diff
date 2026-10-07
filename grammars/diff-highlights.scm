(comment) @comment.line.number-sign.diff @_IGNORE_.spell

[
  (addition)
  (new_file)
] @markup.inserted.diff

[
  (deletion)
  (old_file)
] @markup.deleted.diff

(location) @meta.diff.range.unified

(linerange) @constant.numeric.line-number.diff

(command
  "diff" @keyword.other.diff
  (argument) @variable.parameter.diff)

(filename) @string.unquoted.filename.diff

(commit) @constant.sha.diff

(change) @markup.changed.diff

(special) @string.unquoted.diff

(mode) @constant.numeric.mode.diff

[
  (binary_change)
  (similarity)
  (dissimilarity)
  (file_change)
  (index)
] @meta.diff.header

(binary_patch
  ["GIT" "binary" "patch"] @meta.diff.header)

(binary_hunk
  ["literal" "delta"] @keyword.other.diff
  (size) @constant.numeric.diff)

forward: (binary_hunk (payload) @markup.inserted.diff)
reverse: (binary_hunk (payload) @markup.deleted.diff)

([
  ".."
  "+"
  "++"
  "+++"
  "++++"
  "-"
  "--"
  "---"
  "----"
  ">"
  "<"
  "!"
  "@@"
] @punctuation.definition.diff
  (#set! priority 95))
