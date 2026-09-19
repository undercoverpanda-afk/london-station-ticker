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
    stations: ["Ealing Broadway","Ealing Common","Richmond","Kew Gardens","Gunnersbury","Hounslow West","Hounslow Central","Hounslow East","Osterley","Boston Manor","Northfields","South Ealing","Acton Town","Chiswick Park","Turnham Green","Stamford Brook","Ravenscourt Park","Hammersmith","Barons Court","West Kensington","Wimbledon","Wimbledon Park","Southfields","East Putney","Putney Bridge","Parsons Green","Fulham Broadway","West Brompton","Earl's Court","Gloucester Road","South Kensington","Sloane Square","Victoria","St James's Park","Westminster","Embankment","Temple","Blackfriars","Mansion House","Cannon Street","Monument","Tower Hill","Aldgate East","Whitechapel","Stepney Green","Mile End","Bow Road","Bromley-by-Bow","West Ham","Plaistow","Upton Park","East Ham","Barking","Upney","Becontree","Dagenham Heathway","Dagenham East","Elm Park","Hornchurch","Upminster Bridge","Upminster"]
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
    stations: ["Uxbridge","Hillingdon","Ickenham","Ruislip","Ruislip Manor","Eastcote","Rayners Lane","Watford","Croxley","Amersham","Chesham","Chalfont & Latimer","Chorleywood","Rickmansworth","Moor Park","Northwood Hills","Northwood","Pinner","North Harrow","Harrow-on-the-Hill","Northwick Park","Preston Road","Wembley Park","Finchley Road","Baker Street","Great Portland Street","Euston Square","King's Cross St Pancras","Farringdon","Barbican","Moorgate","Liverpool Street","Aldgate"]
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
    stations: ["Walthamstow Central","Blackhorse Road","Tottenham Hale","Seven Sisters","Finsbury Park","Highbury & Islington","King's Cross St Pancras","Euston","Warren Street","Oxford Circus","Green Park","Victoria","Pimlico","Vauxhall","Stockwell","Brixton"]
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
