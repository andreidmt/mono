module.exports = {
  plugins: ["react", "react-hooks"],
  extends: ["plugin:react-hooks/recommended"],
  rules: {
    // Checks rules of Hooks
    "react-hooks/rules-of-hooks": "error",

    // Checks effect dependencies
    "react-hooks/exhaustive-deps": "warn",

    // Prevent missing displayName in a React component definition
    "react/display-name": "off",

    // Detect missing key prop
    "react/jsx-key": "error",

    // Prevent void DOM elements (e.g. <img />, <br />) from receiving children
    "react/void-dom-elements-no-children": "error",

    // Enforce ES5 or ES6 class for React Components
    "react/prefer-es6-class": "error",

    // Prevent definitions of unused prop types
    "react/no-unused-prop-types": "error",

    // Prevent definitions of unused state
    "react/no-unused-state": "error",

    // Prevent usage of UNSAFE_ methods
    "react/no-unsafe": "error",

    // Prevent usage of setState in componentWillUpdate
    "react/no-will-update-set-state": "error",

    // Forbid certain props on DOM Nodes
    "react/forbid-dom-props": ["error", { forbid: ["id"] }],

    "react/forbid-prop-types": [
      "error",
      {
        forbid: ["any", "array", "object"],
      },
    ],

    // Validate JSX maximum depth
    "react/jsx-max-depth": "off",

    // Prevent this from being used in stateless functional components
    "react/no-this-in-sfc": "error",

    /*
     * This rule prevents comment strings (e.g. beginning with // or /*)
     * from being accidentally injected as a text node in JSX statements.
     */
    "react/jsx-no-comment-textnodes": "warn",

    // Prevent duplicate properties in JSX
    "react/jsx-no-duplicate-props": "error",

    /*
     * When creating a JSX element that has an a tag, it is often desired
     * to have the link open in a new tab using the target='_blank'
     * attribute. Using this attribute unaccompanied by rel='noreferrer
     * noopener', however, is a severe security vulnerability (see here
     * for more details: https://mathiasbynens.github.io/rel-noopener/)
     * This rules requires that you accompany all target='_blank'
     * attributes with rel='noreferrer noopener'.
     */
    "react/jsx-no-target-blank": "error",

    // Disallow undeclared variables in JSX
    "react/jsx-no-undef": [
      "error",
      {
        allowGlobals: true,
      },
    ],

    // Prevent React to be incorrectly marked as unused
    "react/jsx-uses-react": "error",

    // Prevent variables used in JSX to be incorrectly marked as unused
    "react/jsx-uses-vars": "error",

    /*
     * When using a boolean attribute in JSX, you can set the attribute
     * value to true or omit the value. This rule will enforce one or the
     * other to keep consistency in your code.
     */
    "react/jsx-boolean-value": ["error", "always"],

    // Prevent passing of children as props
    "react/no-children-prop": "error",

    // Prevent problem with children and props.dangerouslySetInnerHTML
    "react/no-danger-with-children": "error",

    // Prevent usage of deprecated methods
    "react/no-deprecated": "error",

    // Prevent direct mutation of this.state
    "react/no-direct-mutation-state": "error",

    /*
     * Facebook will eventually deprecate findDOMNode as it blocks certain
     * improvements in React in the future.
     */
    "react/no-find-dom-node": "error",

    /*
     * isMounted is an anti-pattern, is not available when using ES6
     * classes, and it is on its way to being officially deprecated.
     */
    "react/no-is-mounted": "error",

    // Prevent usage of the return value of React.render
    "react/no-render-return-value": "error",

    // Prevent using string references
    "react/no-string-refs": "error",

    // Prevent invalid characters from appearing in markup
    "react/no-unescaped-entities": "error",

    // Prevent invalid characters from appearing in markup
    "react/no-unknown-property": "error",

    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],

    // Prevent missing props validation in a React component definition
    "react/prop-types": "off",

    // Prevent missing React when using JSX
    "react/react-in-jsx-scope": "off",

    // Enforce ES5 or ES6 class for returning value in render function
    "react/require-render-return": "error",

    // Enforce React components to have a shouldComponentUpdate method
    "react/require-optimization": "off",

    // Enforces consistent naming for boolean props
    "react/boolean-prop-naming": [
      "error",
      {
        rule: "^(is|has|can|should).+",
        message: "({{ propName }}) must start with (is|has|can|should)",
      },
    ],

    /*
     * Ensure no casing typos were made declaring static class properties
     * and lifecycle methods.
     */
    "react/no-typos": "error",

    /*
     * Warns if you have shouldComponentUpdate defined when defining a
     * component that extends React.PureComponent. While having
     * shouldComponentUpdate will still work, it becomes pointless to
     * extend PureComponent.
     */
    "react/no-redundant-should-component-update": "error",

    /*
     * Declaring only one component per file improves readability and
     * reusability of components.
     */
    "react/no-multi-comp": "error",

    /*
     * Updating the state after a component update will trigger a second
     * render() call and can lead to property/layout thrashing.
     */
    "react/no-did-update-set-state": "error",

    /*
     * Updating the state after a component mount will trigger a second
     * render() call and can lead to property/layout thrashing.
     */
    "react/no-did-mount-set-state": "error",

    /*
     * Enforces coding style that user-defined JSX components are defined
     * and referenced in PascalCase.
     */
    "react/jsx-pascal-case": "error",

    /*
     * Ensures that any component or prop methods used to handle events
     * are correctly prefixed.
     */
    "react/jsx-handler-names": [
      "error",
      {
        eventHandlerPrefix: "_?handle",
        eventHandlerPropPrefix: "on",
      },
    ],

    /*
     * This rule allows you to enforce curly braces or disallow
     * unnecessary curly braces in JSX props and/or children.
     */
    "react/jsx-curly-brace-presence": [
      "error",
      {
        props: "never",
        children: "never",
      },
    ],

    /*
     * This rule aims to ensure that any non-required PropType declaration
     * of a component has a corresponding defaultProps value.
     */
    "react/require-default-props": [
      "error",
      {
        functions: "defaultArguments",
        forbidDefaultForRequired: true,
      },
    ],

    /*
     * This rule aims to ensure that any defaultProp has a non-required
     * PropType declaration.
     *
     * Having defaultProps for non-existent propTypes is likely the result
     * of errors in refactoring or a sign of a missing propType. Having a
     * defaultProp for a required property similarly indicates a possible
     * refactoring problem.
     */
    "react/default-props-match-prop-types": "error",

    /*
     * Components without children can be self-closed to avoid unnecessary
     * extra closing tag.
     */
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],

    /*
     * When creating React components it is more convenient to always
     * follow the same organisation for method order to help you easily
     * find lifecyle methods, event handlers, etc.
     */
    "react/sort-comp": [
      "error",
      {
        order: [
          "init",
          "lifecycle",
          "rendering",

          "/^(_?)handle.+$/",
          "/^on.+$/",
        ],
        groups: {
          init: [
            "displayName",
            "statics",
            "static-methods",
            "state",
            "contextTypes",
            "childContextTypes",
            "constructor",
            "getDerivedStateFromProps",
          ],
          rendering: ["render", "/^_?render.+$/"],
          lifecycle: [
            "mixins",
            "getDefaultProps",
            "getInitialState",
            "getChildContext",
            "componentWillMount",
            "componentDidMount",
            "componentWillReceiveProps",
            "shouldComponentUpdate",
            "componentWillUpdate",
            "componentDidUpdate",
            "componentWillUnmount",
            "componentDidCatch",
          ],
        },
      },
    ],

    /*
     * A bind call or arrow function in a JSX prop will create a brand new
     * function on every single render. This is bad for performance, as it
     * will result in the garbage collector being invoked way more than is
     * necessary. It may also cause unnecessary re-renders if a brand new
     * function is passed as a prop to a component that uses reference
     * equality check on the prop to determine if it should update.
     */
    "react/jsx-no-bind": "off",

    /*
     * Enforce consistent usage of destructuring assignment of props,
     * state, and context
     */
    "react/destructuring-assignment": ["error", "always"],

    // Prevent using this.state within a this.setState
    "react/no-access-state-in-setstate": "error",

    // Prevent usage of button elements without an explicit type attribute
    "react/button-has-type": "error",
  },
}
