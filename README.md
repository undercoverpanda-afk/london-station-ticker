# London Station Ticker

Lovable prompt — London Underground station tracker

Paste everything below the line into Lovable as the first message.

Build a mobile-first web app called Tube Tracker that lets someone tick off which London Underground stations they have visited. No login, no backend, no accounts. All state lives in the browser via localStorage. Design it for a 390px-wide phone screen first; desktop just centres the same column at max-width 480px.

Core behaviour

Eleven tube lines, each with its own list of stations (data at the bottom).

A horizontally scrollable tab bar at the top switches between lines. The active tab is filled with that line's official colour; inactive tabs are outlined only.

Tapping a station row toggles it between visited and not visited.

Visited state is keyed on the station name string, shared globally across every line. If a user taps "Baker Street" on the Bakerloo tab, it must already appear visited when they open the Circle, Jubilee, Hammersmith & City and Metropolitan tabs. Store visited stations as a single Set<string> of names in one piece of state, not per-line arrays.

A visited station renders with a line-through on the name, reduced opacity (~0.45), and a filled check circle on the right. An unvisited station has full contrast and an empty circle outline.

Persist the visited set to localStorage under key tube-tracker-visited on every change, and rehydrate on load.

Screen layout

Header (sticky): light grey band #EEEEEE, bottom border #D9D9D9. Title "Tube Tracker" in bold 22px. Underneath in regular 15px grey: overall progress, e.g. 84 of 266 stations visited. Total must be the count of unique station names across all lines, not the sum of the per-line lists.

Tab bar (sticky, sits under the header): horizontal scroll, no scrollbar, 8px gaps, each tab a rounded-8px pill with 12px horizontal padding and 40px height. Tab label is the line name. Active tab = solid line colour with the correct contrasting text colour (see table). Inactive tab = white background, 1.5px border in the line colour, text in the line colour.

Line summary strip: directly below the tabs, a full-width bar in the active line's colour showing the line name in bold and 12/25 visited right-aligned, plus a thin progress bar underneath in a translucent white overlay.

Station list: full-width rows, no gaps between rows, 1px #FFFFFF separator, styled directly after the TfL status board look:

Left block, ~58% width, minimum height 64px, background = the active line's colour, station name in bold 17px, left padding 20px, vertically centred, wrapping to two lines when needed.

Right block, remaining width, background #F7F3DD (pale cream). Contains the status label in 15px #1B4CA1 ("Visited" / "Not visited") and a check icon at the far right, 20px right padding.

The entire row is one tap target. Minimum 64px tall. Add a brief background flash and a 150ms scale-down press animation on tap.

Footer bar (fixed to bottom): a search input that filters the current line's list by station name as you type, and a "Reset all" text button that opens a confirmation dialog before clearing the whole visited set.

Colours

Line Background Text on it Bakerloo #B36305 white Central #E32017 white Circle #FFD300 black District #00782A white Hammersmith & City #F3A9BB black Jubilee #A0A5A9 black Metropolitan #9B0056 white Northern #000000 white Piccadilly #003688 white Victoria #0098D4 white Waterloo & City #95CDBA black

Type and tone

Use a clean geometric sans — Inter or Public Sans, tight tracking, heavy weights for names and labels. Do not use the Johnston typeface, the TfL roundel, or any TfL logo; those are licensed marks. This should read as TfL-adjacent, not as an official TfL product.

Accessibility

Every row is a <button> with aria-pressed reflecting visited state.

The strike-through must never be the only visited signal — the status text and icon carry it too.

Tap targets minimum 44px.

Text on Circle, Hammersmith & City, Jubilee and Waterloo & City rows must be black to hold contrast.

Out of scope — do not build

No map, no route planner, no live status or TfL API calls, no sign-in, no server, no sharing, no badges or gamification. One screen, tabs, lists.

Data

Ship this as a single lines.ts constant. Station order within each line matters and must be preserved exactly as written.

export const LINES = [
  {
    name: "Bakerloo",
    colour: "#B36305",
    textColour: "#FFFFFF",
    stations: ["Harrow & Wealdstone","Kenton","South Kenton","North Wembley","Wembley Central","Stonebridge Park","Harlesden","Willesden Junction","Kensal Green","Queen's Park","Kilburn Park","Maida Vale","Warwick Avenue","Paddington","Edgware Road","Marylebone","Baker Street","Regent's Park","Oxford Circus","Piccadilly Circus","Charing Cross","Embankment","Waterloo","Lambeth North","Elephant & Castle"]
  },
  {
    name: "Central",
    colour: "#E32017",
    textColour: "#FFFFFF",
    stations: ["West Ruislip","Ruislip Gardens","South Ruislip","Northolt","Greenford","Perivale","Hanger Lane","Ealing Broadway","West Acton","North Acton","East Acton","White City","Shepherd's Bush","Holland Park","Notting Hill Gate","Queensway","Lancaster Gate","Marble Arch","Bond Street","Oxford Circus","Tottenham Court Road","Holborn","Chancery Lane","St Paul's","Bank","Liverpool Street","Bethnal Green","Mile End","Stratford","Leyton","Leytonstone","Snaresbrook","South Woodford","Woodford","Buckhurst Hill","Loughton","Debden","Theydon Bois","Epping","Wanstead","Redbridge","Gants Hill","Newbury Park","Barkingside","Fairlop","Hainault","Grange Hill","Chigwell","Roding Valley"]
  },
  {
    name: "Circle",
    colour: "#FFD300",
    textColour: "#000000",
    stations: ["Hammersmith","Goldhawk Road","Shepherd's Bush Market","Wood Lane","Latimer Road","Ladbroke Grove","Westbourne Park","Royal Oak","Paddington","Edgware Road","Baker Street","Great Portland Street","Euston Square","King's Cross St Pancras","Farringdon","Barbican","Moorgate","Liverpool Street","Aldgate","Tower Hill","Monument","Cannon Street","Mansion House","Blackfriars","Temple","Embankment","Westminster","St James's Park","Victoria","Sloane Square","South Kensington","Gloucester Road","High Street Kensington","Notting Hill Gate","Bayswater"]
  },
  {
    name: "District",
    colour: "#00782A",
    textColour: "#FFFFFF",
    stations: ["Upminster","Upminster Bridge","Hornchurch","Elm Park","Dagenham East","Dagenham Heathway","Becontree","Upney","Barking","East Ham","Upton Park","Plaistow","West Ham","Bromley-by-Bow","Bow Road","Mile End","Stepney Green","Whitechapel","Aldgate East","Tower Hill","Monument","Cannon Street","Mansion House","Blackfriars","Temple","Embankment","Westminster","St James's Park","Victoria","Sloane Square","South Kensington","Gloucester Road","Earl's Court","West Brompton","Fulham Broadway","Parsons Green","Putney Bridge","East Putney","Southfields","Wimbledon Park","Wimbledon","West Kensington","Barons Court","Hammersmith","Ravenscourt Park","Stamford Brook","Turnham Green","Chiswick Park","Acton Town","South Ealing","Northfields","Boston Manor","Osterley","Hounslow East","Hounslow Central","Hounslow West","Gunnersbury","Kew Gardens","Richmond","Ealing Common","Ealing Broadway"]
  },
  {
    name: "Hammersmith & City",
    colour: "#F3A9BB",
    textColour: "#000000",
    stations: ["Hammersmith","Goldhawk Road","Shepherd's Bush Market","Wood Lane","Latimer Road","Ladbroke Grove","Westbourne Park","Royal Oak","Paddington","Edgware Road","Baker Street","Great Portland Street","Euston Square","King's Cross St Pancras","Farringdon","Barbican","Moorgate","Liverpool Street","Aldgate East","Whitechapel","Stepney Green","Mile End","Bow Road","Bromley-by-Bow","West Ham","Plaistow","Upton Park","East Ham","Barking"]
  },
  {
    name: "Jubilee",
    colour: "#A0A5A9",
    textColour: "#000000",
    stations: ["Stanmore","Canons Park","Queensbury","Kingsbury","Wembley Park","Neasden","Dollis Hill","Willesden Green","Kilburn","West Hampstead","Finchley Road","Swiss Cottage","St John's Wood","Baker Street","Bond Street","Green Park","Westminster","Waterloo","Southwark","London Bridge","Bermondsey","Canada Water","Canary Wharf","North Greenwich","Canning Town","West Ham","Stratford"]
  },
  {
    name: "Metropolitan",
    colour: "#9B0056",
    textColour: "#FFFFFF",
    stations: ["Aldgate","Liverpool Street","Moorgate","Barbican","Farringdon","King's Cross St Pancras","Euston Square","Great Portland Street","Baker Street","Finchley Road","Wembley Park","Preston Road","Northwick Park","Harrow-on-the-Hill","North Harrow","Pinner","Northwood","Northwood Hills","Moor Park","Rickmansworth","Chorleywood","Chalfont & Latimer","Chesham","Amersham","Croxley","Watford","Rayners Lane","Eastcote","Ruislip Manor","Ruislip","Ickenham","Hillingdon","Uxbridge"]
  },
  {
    name: "Northern",
    colour: "#000000",
    textColour: "#FFFFFF",
    stations: ["Edgware","Burnt Oak","Colindale","Hendon Central","Brent Cross","Golders Green","Hampstead","Belsize Park","Chalk Farm","Camden Town","High Barnet","Totteridge & Whetstone","Woodside Park","West Finchley","Finchley Central","Mill Hill East","East Finchley","Highgate","Archway","Tufnell Park","Kentish Town","Mornington Crescent","Euston","King's Cross St Pancras","Warren Street","Goodge Street","Tottenham Court Road","Leicester Square","Charing Cross","Embankment","Waterloo","Old Street","Moorgate","Bank","London Bridge","Borough","Elephant & Castle","Kennington","Oval","Stockwell","Clapham North","Clapham Common","Clapham South","Balham","Tooting Bec","Tooting Broadway","Colliers Wood","South Wimbledon","Morden","Nine Elms","Battersea Power Station"]
  },
  {
    name: "Piccadilly",
    colour: "#003688",
    textColour: "#FFFFFF",
    stations: ["Cockfosters","Oakwood","Southgate","Arnos Grove","Bounds Green","Wood Green","Turnpike Lane","Manor House","Finsbury Park","Arsenal","Holloway Road","Caledonian Road","King's Cross St Pancras","Russell Square","Holborn","Covent Garden","Leicester Square","Piccadilly Circus","Green Park","Hyde Park Corner","Knightsbridge","South Kensington","Gloucester Road","Earl's Court","Barons Court","Hammersmith","Turnham Green","Acton Town","North Ealing","Park Royal","Alperton","Sudbury Town","Sudbury Hill","South Harrow","Rayners Lane","Eastcote","Ruislip Manor","Ruislip","Ickenham","Hillingdon","Uxbridge","South Ealing","Northfields","Boston Manor","Osterley","Hounslow East","Hounslow Central","Hounslow West","Hatton Cross","Heathrow Terminals 2 & 3","Heathrow Terminal 4","Heathrow Terminal 5"]
  },
  {
    name: "Victoria",
    colour: "#0098D4",
    textColour: "#FFFFFF",
    stations: ["Brixton","Stockwell","Vauxhall","Pimlico","Victoria","Green Park","Oxford Circus","Warren Street","Euston","King's Cross St Pancras","Highbury & Islington","Finsbury Park","Seven Sisters","Tottenham Hale","Blackhorse Road","Walthamstow Central"]
  },
  {
    name: "Waterloo & City",
    colour: "#95CDBA",
    textColour: "#000000",
    stations: ["Waterloo","Bank"]
  }
];


Acceptance checks

380 line-station entries across 11 lines, resolving to 266 unique station names. The header total reads 266.

Tapping "King's Cross St Pancras" on any tab marks it visited on all six lines that serve it.

Reloading the page preserves every tick.

Waterloo & City shows exactly two stations.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/75c34fd2-fb18-474d-8cb1-1edb0d325fdd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
