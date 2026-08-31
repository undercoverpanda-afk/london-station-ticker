export type TubeLine = {
  name: string;
  colour: string;
  textColour: string;
  stations: string[];
};

export const LINES: TubeLine[] = [
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

export const ALL_STATIONS: string[] = Array.from(
  new Set(LINES.flatMap((l) => l.stations)),
);
