const m = require('mithril');
const { Colors, Icon, Icons, TabItem, Tabs } = require('construct-ui');

const { Header, Footer } = require('./components');
const { Issue, Revoke, Verify } = require('./pages');

let root = document.body;

function Layout() {
  return {
    view: (vnode) => {
      return m('main', [
        m(Header, [m('h1', { style: { color: Colors.WHITE } }, 'KIWI'), m('p', 'KERI Interactive Web Interface')]),
        m(
          Tabs,
          {
            fluid: false,
            align: 'left',
            bordered: true,
            size: 'lg',
            style: { background: Colors.GREY50 },
          },
          m(
            m.route.Link,
            { href: 'issue' },
            m(TabItem, {
              label: [
                m(Icon, {
                  name: Icons.ARROW_RIGHT_CIRCLE,
                  style: 'margin-right: 10px',
                }),
                'Issue',
              ],
            })
          ),
          m(
            m.route.Link,
            { href: 'revoke' },
            m(TabItem, {
              label: [
                m(Icon, {
                  name: Icons.MINUS_CIRCLE,
                  style: 'margin-right: 10px',
                }),
                'Revoke',
              ],
            })
          ),
          m(
            m.route.Link,
            { href: 'verify' },
            m(TabItem, {
              label: [
                m(Icon, {
                  name: Icons.CHECK_CIRCLE,
                  style: 'margin-right: 10px',
                }),
                'Verify',
              ],
            })
          )
        ),
        m('section', vnode.children),
        m(Footer, 'GLEIF Demo'),
      ]);
    },
  };
}

m.route(root, '/issue', {
  '/issue': {
    render: (vnode) => {
      return m(Layout, m(Issue, vnode.attrs));
    },
  },
  '/revoke': {
    render: (vnode) => {
      return m(Layout, m(Revoke, vnode.attrs));
    },
  },
  '/verify': {
    render: (vnode) => {
      return m(Layout, m(Verify, vnode.attrs));
    },
  },
});