import React from "react";
import { connect } from "react-redux";
import * as marked from "marked";

// Action type
const UPDATE_MARKDOWN = "UPDATE_MARKDOWN";

// Action creator
const updateMarkdown = (markdown) => ({
  type: UPDATE_MARKDOWN,
  payload: markdown,
});

// Initial state
const initialState = {
  markdown: `# Heading 1: This is an Mr. Programmer

## Heading 2: This is a sub Programmer (H2)

[Link to Example](https://www.chatgpt.com)

Inline code: \`const x = 10;\`

\`\`\`js\n
console.log('Hello!');\n
\`\`\`

- Tailwind
- React

> This is a blockquote.

![Image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s)

**Bold**`,
};

// Reducer
const markdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MARKDOWN:
      return { ...state, markdown: action.payload };
    default:
      return state;
  }
};

// Editor Component
class Editor extends React.Component {
  handleChange = (e) => {
    this.props.updateMarkdown(e.target.value);
  };

  render() {
    return (
      <div className="mb-3">
        <h5>Editor</h5>
        <textarea
          id="editor"
          className="form-control"
          rows="10"
          value={this.props.markdown}
          onChange={this.handleChange}
        ></textarea>
      </div>
    );
  }
}

// Previewer Component
class Previewer extends React.Component {
  render() {
    const markdown = marked.parse(this.props.markdown, { breaks: true });
    return (
      <div className="p-3">
        <h5>Preview</h5>
        <div id="preview" dangerouslySetInnerHTML={{ __html: markdown }}></div>
      </div>
    );
  }
}

// Map state and dispatch to props for Editor
const mapStateToPropsEditor = (state) => ({ markdown: state.markdown });
const mapDispatchToPropsEditor = { updateMarkdown };
const ConnectedEditor = connect(
  mapStateToPropsEditor,
  mapDispatchToPropsEditor
)(Editor);

// Map state to props for Previewer
const mapStateToPropsPreviewer = (state) => ({ markdown: state.markdown });
const ConnectedPreviewer = connect(mapStateToPropsPreviewer)(Previewer);

// Export components
export { ConnectedEditor, ConnectedPreviewer, markdownReducer };
