import { defaultTheme } from "evergreen-ui";

export const monadTheme = {
  ...defaultTheme,
  components: {
    ...defaultTheme.components,
    Button: {
      ...defaultTheme.components.Button,
      appearances: {
        ...defaultTheme.components.Button.appearances,
        action: {
          backgroundColor: 'var(--green)',
          color: 'white',
          _hover: {
            backgroundColor: 'var(--darkGreen)'
          },
          _active: {
            backgroundColor: 'var(--darkGreen)'
          }
        }
      },
    },
    Icon: {
      ...defaultTheme.components.Icon,
      baseStyle: {
        ...defaultTheme.components.Icon.baseStyle,
        fill: 'var(--text-primary)',
        color: 'var(--text-primary)',
      }
    },
    Text: {
      ...defaultTheme.components.Text,
      baseStyle: {
        ...defaultTheme.components.Text.baseStyle,
        color: 'var(--text-primary)'
      }
    },
    Heading: {
      ...defaultTheme.components.Heading,
      baseStyle: {
        ...defaultTheme.components.Heading.baseStyle,
        color: 'var(--text-primary)'
      }
    }
  },
};