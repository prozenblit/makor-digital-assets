const SECTIONS = ["platforms", "decks", "marketing"];

const SECTION_LABELS = {
  platforms: "Platforms & Apps",
  decks: "Decks",
  marketing: "Marketing & Events"
};

const PROJECTS = {
  platforms: [
    {
      id: "makorxai",
      name: "MakorX.AI",
      platformLinks: [],
      apps: [
        {
          id: "hr",
          name: "HR",
          description: "Employee directory, time tracking, WFH management. Light & dark mode.",
          status: "live",
          assets: [
            {
              type: "figma",
              name: "Figma Design File",
              description: "Full design file with all screens and components",
              actions: [
                { label: "Open in Figma", type: "open", url: "https://www.figma.com/design/qLvCCFgKO85vqiKxVTcqJE/Makor-X.AI?node-id=28-287" }
              ]
            },
            {
              type: "github",
              name: "GitHub Repository",
              description: "Source code and branches",
              actions: [
                { label: "Open on GitHub", type: "open", url: "https://github.com/prozenblit/makor-hr" }
              ]
            },
            {
              type: "tokens",
              name: "Design Tokens",
              description: "tokens.css and tokens.json — all brand values as named variables",
              actions: [
                { label: "Download CSS", type: "download", url: "../makor-hr/design-system/tokens.css", filename: "makor-hr-tokens.css" },
                { label: "Download JSON", type: "download", url: "../makor-hr/design-system/tokens.json", filename: "makor-hr-tokens.json" }
              ]
            },
            {
              type: "claude",
              name: "CLAUDE.md — Agent Brand Rules",
              description: "Load this at the start of any Claude session working on this platform. Covers all design rules.",
              actions: [
                { label: "View", type: "view", url: "../makor-hr/design-system/CLAUDE.md" },
                { label: "Download", type: "download", url: "../makor-hr/design-system/CLAUDE.md", filename: "makor-hr-CLAUDE.md" }
              ]
            },
            {
              type: "css",
              name: "Component Library CSS",
              description: "43 components, every state (hover, focus, active, disabled), light + dark mode. Drop-in ready.",
              actions: [
                { label: "Download CSS", type: "download", url: "../makor-hr/design-system/components.css", filename: "makor-hr-components.css" }
              ]
            },
            {
              type: "html-ref",
              name: "Component HTML Reference",
              description: "Copy-paste HTML for every component. Load alongside CLAUDE.md in any Claude session — agents use this to implement components without guessing class names.",
              actions: [
                { label: "View", type: "view", url: "../makor-hr/design-system/components.md" },
                { label: "Download", type: "download", url: "../makor-hr/design-system/components.md", filename: "makor-hr-components.md" }
              ]
            },
            {
              type: "showcase",
              name: "Component Showcase",
              description: "Live interactive page — all 43 components rendered with every state. Copy HTML per component. Toggle dark mode.",
              actions: [
                { label: "Open", type: "open", url: "../makor-hr/design-system/showcase.html" }
              ]
            }
          ]
        },
        {
          id: "compliance",
          name: "Compliance",
          description: "Coming soon — design system in progress",
          status: "wip",
          assets: []
        },
        {
          id: "pl",
          name: "P&L",
          description: "Coming soon — design system in progress",
          status: "wip",
          assets: []
        },
        {
          id: "accounting",
          name: "Accounting",
          description: "Coming soon — design system in progress",
          status: "wip",
          assets: []
        },
        {
          id: "research",
          name: "Research",
          description: "Coming soon — design system in progress",
          status: "wip",
          assets: []
        },
        {
          id: "derivatives",
          name: "Derivatives",
          description: "Coming soon — design system in progress",
          status: "wip",
          assets: []
        },
        {
          id: "system",
          name: "System",
          description: "Coming soon — design system in progress",
          status: "wip",
          assets: []
        },
        {
          id: "structured-products",
          name: "Structured Products",
          description: "Coming soon — design system in progress",
          status: "wip",
          assets: []
        },
        {
          id: "cash-equity",
          name: "Cash Equity",
          description: "Coming soon — design system in progress",
          status: "wip",
          assets: []
        },
        {
          id: "ticketing",
          name: "Ticketing",
          description: "Coming soon — design system in progress",
          status: "wip",
          assets: []
        },
        {
          id: "it",
          name: "IT",
          description: "Coming soon — design system in progress",
          status: "wip",
          assets: []
        },
        {
          id: "bi",
          name: "BI",
          description: "Coming soon — design system in progress",
          status: "wip",
          assets: []
        },
        {
          id: "auth",
          name: "Auth",
          description: "Makor-X.AI sign-in portal and mobile authenticator — light & dark mode, OTP 2FA flow",
          status: "live",
          assets: [
            {
              type: "prototype",
              name: "Sign In — Web Portal",
              description: "Interactive prototype of the Makor-X.AI web sign-in page with two-step OTP flow",
              actions: [
                { label: "Open", type: "open", url: "auth/makor-signin.html" }
              ]
            },
            {
              type: "prototype",
              name: "Authenticator App — Light",
              description: "Interactive mobile authenticator prototype — Face ID unlock, push notification, OTP code sheet",
              actions: [
                { label: "Open", type: "open", url: "auth/makor-authenticator.html" }
              ]
            },
            {
              type: "prototype",
              name: "Authenticator App — Dark",
              description: "Dark mode variant of the mobile authenticator — same flow, teal-on-dark palette",
              actions: [
                { label: "Open", type: "open", url: "auth/makor-authenticator-dark.html" }
              ]
            },
            {
              type: "tokens",
              name: "Design Tokens",
              description: "tokens.css and tokens.json — all auth brand values as CSS custom properties. Web sign-in portal + mobile authenticator, light and dark mode.",
              actions: [
                { label: "Download CSS", type: "download", url: "../makor-hr/auth-design-system/tokens.css", filename: "makor-auth-tokens.css" },
                { label: "Download JSON", type: "download", url: "../makor-hr/auth-design-system/tokens.json", filename: "makor-auth-tokens.json" }
              ]
            },
            {
              type: "claude",
              name: "CLAUDE.md — Auth Agent Rules",
              description: "Load at the start of any Claude session working on MakorX.AI auth. Covers EB Garamond / Geist rules, dual-mode brand colors, radius scale, input specs, all non-negotiables, and component inventory.",
              actions: [
                { label: "View", type: "view", url: "../makor-hr/auth-design-system/CLAUDE.md" },
                { label: "Download", type: "download", url: "../makor-hr/auth-design-system/CLAUDE.md", filename: "makor-auth-CLAUDE.md" }
              ]
            },
            {
              type: "css",
              name: "Component Library CSS",
              description: "All auth components — sign-in card, inputs, OTP slots, buttons, Face ID, push notification banner, bottom sheet, OTP code display, session cards, confirm dialog, toast. Every state, both modes.",
              actions: [
                { label: "Download CSS", type: "download", url: "../makor-hr/auth-design-system/components.css", filename: "makor-auth-components.css" }
              ]
            },
            {
              type: "html-ref",
              name: "Component HTML Reference",
              description: "Copy-paste HTML for every auth component with JS behavior notes. Load alongside CLAUDE.md — agents use this to implement components without guessing class names.",
              actions: [
                { label: "View", type: "view", url: "../makor-hr/auth-design-system/components.md" },
                { label: "Download", type: "download", url: "../makor-hr/auth-design-system/components.md", filename: "makor-auth-components.md" }
              ]
            },
            {
              type: "showcase",
              name: "Component Showcase",
              description: "Live dual-mode showcase — all auth components in light and dark: colors, typography, sign-in card, OTP slots, OTP code display, Face ID, push banner, bottom sheet, session cards, toast, confirm dialog.",
              actions: [
                { label: "Open", type: "open", url: "../makor-hr/auth-design-system/showcase.html" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "og-risk-arb",
      name: "OG Risk Arb",
      platformLinks: [
        { type: "figma", label: "Figma Design File", url: "https://www.figma.com/design/VlOfBG6fJt7ijm0iKasAMP/OG-Risk-Arb?node-id=48-850&t=PhKPnqyWdAUe85J9-1" }
      ],
      apps: [
        {
          id: "main",
          name: "OG Risk Arb",
          description: "Risk arbitrage deal tracking & research platform — light mode, Inter font, deep teal brand. Deal monitor, event tracker, commentary feed.",
          status: "live",
          assets: [
            {
              type: "figma",
              name: "Figma Design File",
              description: "Full design file with all screens and components",
              actions: [
                { label: "Open in Figma", type: "open", url: "https://www.figma.com/design/VlOfBG6fJt7ijm0iKasAMP/OG-Risk-Arb?node-id=48-850&t=PhKPnqyWdAUe85J9-1" }
              ]
            },
            {
              type: "tokens",
              name: "Design Tokens",
              description: "tokens.css and tokens.json — all brand values as named variables",
              actions: [
                { label: "Download CSS", type: "download", url: "../og-risk-arb/design-system/tokens.css", filename: "og-risk-arb-tokens.css" },
                { label: "Download JSON", type: "download", url: "../og-risk-arb/design-system/tokens.json", filename: "og-risk-arb-tokens.json" }
              ]
            },
            {
              type: "claude",
              name: "CLAUDE.md — Agent Brand Rules",
              description: "Load this at the start of any Claude session working on this platform. Covers all design rules.",
              actions: [
                { label: "View", type: "view", url: "../og-risk-arb/design-system/CLAUDE.md" },
                { label: "Download", type: "download", url: "../og-risk-arb/design-system/CLAUDE.md", filename: "og-risk-arb-CLAUDE.md" }
              ]
            },
            {
              type: "css",
              name: "Component Library CSS",
              description: "All components — sidebar, tabs, buttons, filters, deal table, badges, accordion, comments, events — every state. Drop-in ready.",
              actions: [
                { label: "Download CSS", type: "download", url: "../og-risk-arb/design-system/components.css", filename: "og-risk-arb-components.css" }
              ]
            },
            {
              type: "html-ref",
              name: "Component HTML Reference",
              description: "Copy-paste HTML for every component. Load alongside CLAUDE.md in any Claude session — agents use this to implement components without guessing class names.",
              actions: [
                { label: "View", type: "view", url: "../og-risk-arb/design-system/components.md" },
                { label: "Download", type: "download", url: "../og-risk-arb/design-system/components.md", filename: "og-risk-arb-components.md" }
              ]
            },
            {
              type: "showcase",
              name: "Component Showcase",
              description: "Live interactive page — all components rendered with every state. Colors, typography, deal UI patterns, sidebar, tabs, badges.",
              actions: [
                { label: "Open", type: "open", url: "../og-risk-arb/design-system/showcase.html" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "equity-derivatives-auction",
      name: "Equity Derivatives Auction",
      platformLinks: [
        { type: "figma", label: "Figma Design File", url: "https://www.figma.com/design/vtP9aj7XLJ292TjETXmrum/Equity-Derivatives-Auction?node-id=48-1021&t=5yQb7UD0vr1hXOXZ-1" }
      ],
      apps: [
        {
          id: "main",
          name: "Equity Derivatives Auction",
          description: "Dark-mode desktop platform for equity derivatives auctions (Cash Close, EFP). Bid/ask pricing across FTSE 100, CAC40, EURO STOXX 50 with real-time equilibrium price and countdown timers. Inter · 6–8–10px radius · Dark mode only.",
          status: "live",
          assets: [
            {
              type: "figma",
              name: "Figma Design File",
              description: "Full design file with all screens and components",
              actions: [
                { label: "Open in Figma", type: "open", url: "https://www.figma.com/design/vtP9aj7XLJ292TjETXmrum/Equity-Derivatives-Auction?node-id=48-1021&t=5yQb7UD0vr1hXOXZ-1" }
              ]
            },
            {
              type: "tokens",
              name: "Design Tokens",
              description: "tokens.css and tokens.json — all brand values as named variables",
              actions: [
                { label: "Download CSS", type: "download", url: "../equity-derivatives/design-system/tokens.css", filename: "equity-derivatives-tokens.css" },
                { label: "Download JSON", type: "download", url: "../equity-derivatives/design-system/tokens.json", filename: "equity-derivatives-tokens.json" }
              ]
            },
            {
              type: "claude",
              name: "CLAUDE.md — Agent Brand Rules",
              description: "Load this at the start of any Claude session working on this platform. Covers all design rules.",
              actions: [
                { label: "View", type: "view", url: "../equity-derivatives/design-system/CLAUDE.md" },
                { label: "Download", type: "download", url: "../equity-derivatives/design-system/CLAUDE.md", filename: "equity-derivatives-CLAUDE.md" }
              ]
            },
            {
              type: "css",
              name: "Component Library CSS",
              description: "All components — auction cards, bid/ask inputs, timer badges, modals, toggles, admin tables — every state. Drop-in ready.",
              actions: [
                { label: "Download CSS", type: "download", url: "../equity-derivatives/design-system/components.css", filename: "equity-derivatives-components.css" }
              ]
            },
            {
              type: "html-ref",
              name: "Component HTML Reference",
              description: "Copy-paste HTML for every component. Load alongside CLAUDE.md in any Claude session — agents use this to implement components without guessing class names.",
              actions: [
                { label: "View", type: "view", url: "../equity-derivatives/design-system/components.md" },
                { label: "Download", type: "download", url: "../equity-derivatives/design-system/components.md", filename: "equity-derivatives-components.md" }
              ]
            },
            {
              type: "showcase",
              name: "Component Showcase",
              description: "Live interactive page — all components rendered with every state. Colors, typography, auction UI patterns, admin modals.",
              actions: [
                { label: "Open", type: "open", url: "../equity-derivatives/design-system/showcase.html" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "fx-engine-room",
      name: "FX Engine Room",
      platformLinks: [
        { type: "figma", label: "Figma Design File", url: "https://www.figma.com/design/yuJA7DtjFKnqTZQcu2vKYN/FX-Engine-Room?node-id=0-1&t=jTO3S8YXhSXq6D9b-1" }
      ],
      apps: [
        {
          id: "main",
          name: "FX Engine Room",
          description: "Dark-mode FX operations platform — entity management, trading accounts, product permissions (Spot/Forwards/Options), trader management. Inter font, lavender brand, dark navy surfaces.",
          status: "live",
          assets: [
            {
              type: "figma",
              name: "Figma Design File",
              description: "Full design file with all screens and components",
              actions: [
                { label: "Open in Figma", type: "open", url: "https://www.figma.com/design/yuJA7DtjFKnqTZQcu2vKYN/FX-Engine-Room?node-id=0-1&t=jTO3S8YXhSXq6D9b-1" }
              ]
            },
            {
              type: "tokens",
              name: "Design Tokens",
              description: "tokens.css and tokens.json — all brand values as named variables. Dark mode only.",
              actions: [
                { label: "Download CSS", type: "download", url: "../fx-engine-room/design-system/tokens.css", filename: "fx-engine-room-tokens.css" },
                { label: "Download JSON", type: "download", url: "../fx-engine-room/design-system/tokens.json", filename: "fx-engine-room-tokens.json" }
              ]
            },
            {
              type: "claude",
              name: "CLAUDE.md — Agent Brand Rules",
              description: "Load this at the start of any Claude session working on this platform. Covers all design rules, color system, and component conventions.",
              actions: [
                { label: "View", type: "view", url: "../fx-engine-room/design-system/CLAUDE.md" },
                { label: "Download", type: "download", url: "../fx-engine-room/design-system/CLAUDE.md", filename: "fx-engine-room-CLAUDE.md" }
              ]
            },
            {
              type: "css",
              name: "Component Library CSS",
              description: "All components — buttons (brand/teal/amber/cancel/save), inputs, toggles, radios, checkboxes, tag input, list panel, detail panel, sidebar, footer, permissions grid, login card. Every state. Dark mode only.",
              actions: [
                { label: "Download CSS", type: "download", url: "../fx-engine-room/design-system/components.css", filename: "fx-engine-room-components.css" }
              ]
            },
            {
              type: "html-ref",
              name: "Component HTML Reference",
              description: "Copy-paste HTML for every component. Load alongside CLAUDE.md in any Claude session — agents use this to implement components without guessing class names.",
              actions: [
                { label: "View", type: "view", url: "../fx-engine-room/design-system/components.md" },
                { label: "Download", type: "download", url: "../fx-engine-room/design-system/components.md", filename: "fx-engine-room-components.md" }
              ]
            },
            {
              type: "showcase",
              name: "Component Showcase",
              description: "Live interactive dark-mode page — all components rendered with every state. Colors, typography, trading UI patterns, login card.",
              actions: [
                { label: "Open", type: "open", url: "../fx-engine-room/design-system/showcase.html" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "enigma-x",
      name: "Enigma X",
      platformLinks: [
        { type: "figma", label: "Figma Design File", url: "https://www.figma.com/design/3PpdEgLKQZaybhyIILCfUF/Enigma-X?node-id=16-1909&t=yvcq35C08ec7xKiy-1" }
      ],
      apps: [
        {
          id: "main",
          name: "Enigma X",
          description: "Spot trading platform — crypto pairs, live bid/ask, order book. DM Sans + DM Mono, light mode.",
          status: "live",
          assets: [
            {
              type: "figma",
              name: "Figma Design File",
              description: "Full design file with all screens and components",
              actions: [
                { label: "Open in Figma", type: "open", url: "https://www.figma.com/design/3PpdEgLKQZaybhyIILCfUF/Enigma-X?node-id=16-1909&t=yvcq35C08ec7xKiy-1" }
              ]
            },
            {
              type: "tokens",
              name: "Design Tokens",
              description: "tokens.css and tokens.json — all brand values as named variables",
              actions: [
                { label: "Download CSS", type: "download", url: "../enigma-x/design-system/tokens.css", filename: "enigma-x-tokens.css" },
                { label: "Download JSON", type: "download", url: "../enigma-x/design-system/tokens.json", filename: "enigma-x-tokens.json" }
              ]
            },
            {
              type: "claude",
              name: "CLAUDE.md — Agent Brand Rules",
              description: "Load this at the start of any Claude session working on this platform. Covers all design rules.",
              actions: [
                { label: "View", type: "view", url: "../enigma-x/design-system/CLAUDE.md" },
                { label: "Download", type: "download", url: "../enigma-x/design-system/CLAUDE.md", filename: "enigma-x-CLAUDE.md" }
              ]
            },
            {
              type: "css",
              name: "Component Library CSS",
              description: "All components — buttons, inputs, tables, price panels, ticker, badges — every state. Drop-in ready.",
              actions: [
                { label: "Download CSS", type: "download", url: "../enigma-x/design-system/components.css", filename: "enigma-x-components.css" }
              ]
            },
            {
              type: "html-ref",
              name: "Component HTML Reference",
              description: "Copy-paste HTML for every component. Load alongside CLAUDE.md in any Claude session — agents use this to implement components without guessing class names.",
              actions: [
                { label: "View", type: "view", url: "../enigma-x/design-system/components.md" },
                { label: "Download", type: "download", url: "../enigma-x/design-system/components.md", filename: "enigma-x-components.md" }
              ]
            },
            {
              type: "showcase",
              name: "Component Showcase",
              description: "Live interactive page — all components rendered with every state. Colors, typography, trading UI patterns.",
              actions: [
                { label: "Open", type: "open", url: "../enigma-x/design-system/showcase.html" }
              ]
            }
          ]
        },
        {
          id: "auth",
          name: "Auth",
          description: "Enigma X sign-in portal and mobile authenticator — teal brand, same 2FA flow as Makor auth",
          status: "live",
          assets: [
            {
              type: "prototype",
              name: "Sign In — Web Portal",
              description: "Interactive prototype of the Enigma X web sign-in page with OTP 2FA flow",
              actions: [
                { label: "Open", type: "open", url: "auth/enigma-signin.html" }
              ]
            },
            {
              type: "prototype",
              name: "Authenticator App",
              description: "Interactive mobile authenticator prototype — Face ID unlock, push notification, OTP code sheet",
              actions: [
                { label: "Open", type: "open", url: "auth/enigma-authenticator.html" }
              ]
            },
            {
              type: "tokens",
              name: "Design Tokens",
              description: "tokens.css and tokens.json — all auth brand values as named variables (--auth-* prefix)",
              actions: [
                { label: "Download CSS", type: "download", url: "../enigma-x/auth-design-system/tokens.css", filename: "enigma-auth-tokens.css" },
                { label: "Download JSON", type: "download", url: "../enigma-x/auth-design-system/tokens.json", filename: "enigma-auth-tokens.json" }
              ]
            },
            {
              type: "claude",
              name: "CLAUDE.md — Auth Agent Rules",
              description: "Load at the start of any Claude session working on Enigma X auth. Covers DM Sans/Mono rules, 4px radius, teal brand, all non-negotiables, and component inventory.",
              actions: [
                { label: "View", type: "view", url: "../enigma-x/auth-design-system/CLAUDE.md" },
                { label: "Download", type: "download", url: "../enigma-x/auth-design-system/CLAUDE.md", filename: "enigma-auth-CLAUDE.md" }
              ]
            },
            {
              type: "css",
              name: "Component Library CSS",
              description: "All auth components — sign-in card, inputs, password toggle, OTP slots, buttons, Face ID, push banner, bottom sheet, toast, confirm dialog, session cards. Every state. Drop-in ready.",
              actions: [
                { label: "Download CSS", type: "download", url: "../enigma-x/auth-design-system/components.css", filename: "enigma-auth-components.css" }
              ]
            },
            {
              type: "html-ref",
              name: "Component HTML Reference",
              description: "Copy-paste HTML for every auth component with JS behavior notes. Load alongside CLAUDE.md — agents use this to implement components without guessing class names.",
              actions: [
                { label: "View", type: "view", url: "../enigma-x/auth-design-system/components.md" },
                { label: "Download", type: "download", url: "../enigma-x/auth-design-system/components.md", filename: "enigma-auth-components.md" }
              ]
            },
            {
              type: "showcase",
              name: "Component Showcase",
              description: "Live interactive page — all auth components with every state: colors, typography, password show/hide, OTP auto-advance, Face ID, push notification, bottom sheet, toast, confirm dialog.",
              actions: [
                { label: "Open", type: "open", url: "../enigma-x/auth-design-system/showcase.html" }
              ]
            }
          ]
        }
      ]
    }
  ],

  decks: [
    {
      id: "q4-2026",
      name: "Q4 2026 Report",
      description: "Quarterly performance deck — Excel-connected. Update numbers in the spreadsheet, deck reflects changes automatically.",
      status: "placeholder",
      assets: [
        {
          type: "deck",
          name: "Live Deck",
          description: "Web presentation — always shows the latest numbers",
          actions: [
            { label: "Coming soon", type: "disabled", url: "" }
          ]
        },
        {
          type: "excel",
          name: "Data File",
          description: "Update numbers here — the deck reads from this file",
          actions: [
            { label: "Coming soon", type: "disabled", url: "" }
          ]
        }
      ]
    }
  ],

  marketing: [
    {
      id: "marketing-placeholder",
      name: "Marketing Materials",
      description: "Event posters, social cards, and client templates — coming soon",
      status: "placeholder",
      assets: []
    }
  ]
};
