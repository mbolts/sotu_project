// var data = {};

// data = d3.hierarchy('http://localhost:5000/speech_text.json')

var global_data;
data = d3.json("/speech_text.json").then(function (data) {
    console.log(data);
    global_data = data;
}).catch(console.log.bind(console));
console.log(global_data);



// data.parties = [{
//     name: "democrat",
//     speeches: d3.json('/speech_text.json').then(function (data) {
//         console.log(data);
//         return data;
//     })
// }, {
//     name: "republican",
//     speeches: d3.json('/speech_text.json').then(function (data) {
//         return data.data;
//     })
// }];

// data.speakers = {
//     "AL GREEN": {
//         name: "Al Green",
//         title: "U.S. representative, Texas"
//     },
//     "ALEX SCHRIVER": {
//         name: "Alex Schriver",
//         title: "College Republican National Committee chairman"
//     },
//     "ALLYSON SCHWARTZ": {
//         name: "Allyson Y. Schwartz",
//         title: "U.S. representative, Pennsylvania"
//     },
//     "ANDY BARR": {
//         name: "Andy Barr",
//         title: "Congressional candidate, Kentucky"
//     },
//     "ANN ROMNEY": {
//         name: "Ann Romney",
//         title: "Wife of Mitt Romney"
//     },
//     "ANTHONY FOXX": {
//         name: "Anthony R. Foxx",
//         title: "Mayor of Charlotte, N.C."
//     },
//     "ANTONIO VILLARAIGOSA": {
//         name: "Antonio R. Villaraigosa",
//         title: "Mayor of Los Angeles"
//     },
//     "ARNE DUNCAN": {
//         name: "Arne Duncan",
//         title: "U.S. secretary of education"
//     },
//     "ARTUR DAVIS": {
//         name: "Artur Davis",
//         title: "U.S. representative, Alabama"
//     },
//     "AUSTIN LIGON": {
//         name: "Austin Ligon",
//         title: "Co-Founder of CarMax Inc."
//     },
//     "BARBARA BUSH": {
//         name: "Barbara Bush",
//         title: "Former first lady"
//     },
//     "BARBARA COMSTOCK": {
//         name: "Barbara Comstock",
//         title: "State representative, Virginia"
//     },
//     "BARACK OBAMA": {
//         name: "Barack Obama",
//         title: "President of the United States"
//     },
//     "BARBARA LEE": {
//         name: "Barbara Lee",
//         title: "U.S. representative, California"
//     },
//     "BARBARA MIKULSKI": {
//         name: "Barbara A. Mikulski",
//         title: "U.S. senator, Maryland"
//     },
//     "BARNEY FRANK": {
//         name: "Barney Frank",
//         title: "U.S. representative, Massachusetts"
//     },
//     "BEAU BIDEN": {
//         name: "Beau Biden",
//         title: "Attorney general of Delaware and son of the vice president"
//     },
//     "BENITA VELIZ": {
//         name: "Benita Veliz",
//         title: "Dream Act Activist"
//     },
//     "BEV GRAY": {
//         name: "Bev Gray",
//         title: "Small-business owner"
//     },
//     "BEV PERDUE": {
//         name: "Bev Perdue",
//         title: "Governor of North Carolina"
//     },
//     "BILL CLINTON": {
//         name: "Bill Clinton",
//         title: "42nd president of the United States"
//     },
//     "BOB BUCKHORN": {
//         name: "Bob Buckhorn",
//         title: "Mayor of Tampa"
//     },
//     "BOB KING": {
//         name: "Bob King",
//         title: "President of the United Auto Workers"
//     },
//     "BOB MCDONNELL": {
//         name: "Bob McDonnell",
//         title: "Governor of Virginia"
//     },
//     "BRIAN SANDOVAL": {
//         name: "Brian Sandoval",
//         title: "Governor of Nevada"
//     },
//     "BRIAN SCHWEITZER": {
//         name: "Brian Schweitzer",
//         title: "Governor of Montana"
//     },
//     "CALLISTA GINGRICH": {
//         name: "Callista Gingrich",
//         title: "Wife of Newt Gingrich"
//     },
//     "CAROL WELLS": {
//         name: "Carol Wells",
//         title: "Wife of Ron Paul"
//     },
//     "CAROLINE KENNEDY": {
//         name: "Caroline Kennedy",
//         title: "Author and attorney"
//     },
//     "CAROLYN MALONEY": {
//         name: "Carolyn B. Maloney",
//         title: "U.S. representative, New York"
//     },
//     "CATHY MCMORRIS RODGERS": {
//         name: "Cathy McMorris Rodgers",
//         title: "U.S. representative, Washington"
//     },
//     "CECILE RICHARDS": {
//         name: "Cecile Richards",
//         title: "President of Planned Parenthood Federation of America"
//     },
//     "CHARLES SCHUMER": {
//         name: "Charles E. Schumer",
//         title: "U.S. senator, New York"
//     },
//     "CHARLIE CRIST": {
//         name: "Charlie Crist",
//         title: "Former governor of Florida"
//     },
//     "CHARLIE GONZALEZ": {
//         name: "Charlie Gonzalez",
//         title: "U.S. representative, Texas"
//     },
//     "CHRIS CHRISTIE": {
//         name: "Chris Christie",
//         title: "Governor of New Jersey"
//     },
//     "CHRIS DEVON YOUNG": {
//         name: "Chris Devlin-Young",
//         title: "Paralympic ski champion"
//     },
//     "CHRIS FUSSNER": {
//         name: "Chris Fussner",
//         title: "Republicans Abroad chairman"
//     },
//     "CHRISTOPHER VAN HOLLEN": {
//         name: "Chris Van Hollen",
//         title: "U.S. representative, Maryland"
//     },
//     "CINDY HEWITT": {
//         name: "Cindy Hewitt",
//         title: "Former employee at a company controlled by Bain Capital"
//     },
//     "CLAUDIA KENNEDY": {
//         name: "Claudia J. Kennedy",
//         title: "Lieutenant General (Army, retired)"
//     },
//     "CLINT EASTWOOD": {
//         name: "Clint Eastwood",
//         title: "Actor, film director"
//     },
//     "CONDOLEEZZA RICE": {
//         name: "Condoleezza Rice",
//         title: "Former Secretary of State"
//     },
//     "CORY BOOKER": {
//         name: "Cory Booker",
//         title: "Mayor of Newark"
//     },
//     "CRAIG ROBINSON": {
//         name: "Craig Robinson",
//         title: "Brother of Michelle Obama"
//     },
//     "CRAIG ROMNEY": {
//         name: "Craig Romney",
//         title: "Son of Mitt Romney"
//     },
//     "CRISTINA SARALEGUI": {
//         name: "Cristina Saralegui",
//         title: "Talk show host"
//     },
//     "DAN BENISHEK": {
//         name: "Dan Benishek",
//         title: "U.S. representative, Michigan"
//     },
//     "DAN MALLOY": {
//         name: "Dannel P. Malloy",
//         title: "Governor of Connecticut"
//     },
//     "DANA CARVEY": {
//         name: "Dana Carvey",
//         title: "Comedian"
//     },
//     "DAVID FOSTER": {
//         name: "David Foster",
//         title: "Former employee at a company controlled by Bain Capital"
//     },
//     "DAVID PRICE": {
//         name: "David Price",
//         title: "U.S. representative, North Carolina"
//     },
//     "DAVID ROUZER": {
//         name: "David Rouzer",
//         title: "Congressional candidate, North Carolina"
//     },
//     "DEB FISCHER": {
//         name: "Deb Fischer",
//         title: "Senate candidate, Nebraska"
//     },
//     "DEBBIE WASSERMAN SCHULTZ": {
//         name: "Debbie Wasserman Schultz",
//         title: "U.S. representative, Florida"
//     },
//     "DENISE JUNEAU": {
//         name: "Denise Juneau",
//         title: "Superintendent of the Montana Office of Public Instruction"
//     },
//     "DEVAL PATRICK": {
//         name: "Deval Patrick",
//         title: "Governor of Massachusetts"
//     },
//     "DIANA DEGETTE": {
//         name: "Diana DeGette",
//         title: "U.S. representative, Colorado"
//     },
//     "DONNA EDWARDS": {
//         name: "Donna Edwards",
//         title: "U.S. representative, Maryland"
//     },
//     "DOUG STERN": {
//         name: "Doug Stern",
//         title: "Firefighter"
//     },
//     "ELAINE BRYE": {
//         name: "Elaine Brye",
//         title: "Teacher"
//     },
//     "ELIZABETH WARREN": {
//         name: "Elizabeth Warren",
//         title: "Senate candidate, Massachusetts"
//     },
//     "EMANUEL CLEAVER": {
//         name: "Emanuel Cleaver II",
//         title: "U.S. representative, Missouri"
//     },
//     "ERIC SHINSEKI": {
//         name: "Gen. Eric K. Shinseki",
//         title: "U.S. secretary of veterans affairs"
//     },
//     "EVA LONGORIA": {
//         name: "Eva Longoria",
//         title: "Actress"
//     },
//     "G.K. BUTTERFIELD": {
//         name: "G.K. Butterfield",
//         title: "U.S. representative, North Carolina"
//     },
//     "GEORGE H.W. BUSH": {
//         name: "GEORGE H.W. BUSH",
//         title: "41st president of the United States"
//     },
//     "GEORGE W. BUSH": {
//         name: "GEORGE W. BUSH",
//         title: "43rd president of the United States"
//     },
//     "GWEN MOORE": {
//         name: "Gwen Moore",
//         title: "U.S. representative, Wisconsin"
//     },
//     "HARRY REID": {
//         name: "Harry Reid",
//         title: "Senate majority leader"
//     },
//     "HARVEY GANTT": {
//         name: "Harvey B. Gantt",
//         title: "Former mayor of Charlotte, N.C."
//     },
//     "JACK GILCHRIST": {
//         name: "Jack Gilchrist",
//         title: "Small-business owner"
//     },
//     "JACK MARKELL": {
//         name: "Jack Markell",
//         title: "Governor of Delaware"
//     },
//     "JACKIE WALORSKI": {
//         name: "Jackie Walorski",
//         title: "State representative, Indiana"
//     },
//     "JAMES CLYBURN": {
//         name: "James E. Clyburn",
//         title: "U.S. representative, South Carolina"
//     },
//     "JAMES ROGERS": {
//         name: "James Rogers",
//         title: "Chief executive of Duke Energy"
//     },
//     "JANINE TURNER": {
//         name: "Janine Turner",
//         title: "Actress"
//     },
//     "JARED POLIS": {
//         name: "Jared Polis",
//         title: "U.S. representative, Colorado"
//     },
//     "JASON CHAFFETZ": {
//         name: "Jason Chaffetz",
//         title: "U.S. representative, Utah"
//     },
//     "JEANINE MCDONNELL": {
//         name: "Jeanine McDonnell",
//         title: "Iraq war veteran, daughter of Virginia governor"
//     },
//     "JEB BUSH": {
//         name: "Jeb Bush",
//         title: "Former governor of Florida"
//     },
//     "JENNIFER GRANHOLM": {
//         name: "Jennifer Granholm",
//         title: "Former governor of Michigan"
//     },
//     "JILL BIDEN": {
//         name: "Dr. Jill Biden",
//         title: "Second lady of the United States"
//     },
//     "JIM HUNT": {
//         name: "Jim Hunt",
//         title: "Former governor of North Carolina"
//     },
//     "JIM MESSINA": {
//         name: "Jim Messina",
//         title: "Campaign manager, Obama for America"
//     },
//     "JIM SINEGAL": {
//         name: "Jim Sinegal",
//         title: "Co-Founder of Costco"
//     },
//     "JIMMY CARTER": {
//         name: "Jimmy Carter",
//         title: "39th president of the United States"
//     },
//     "JOAQUIN CASTRO": {
//         name: "Joaquín Castro",
//         title: "State representative, Texas"
//     },
//     "JOSEPH BIDEN": {
//         name: "Joseph R. Biden Jr.",
//         title: "Vice president of the United States"
//     },
//     "JOE KENNEDY III": {
//         name: "Joseph P. Kennedy III",
//         title: "Congressional candidate, Massachusetts"
//     },
//     "JOHN ARCHER": {
//         name: "John Archer",
//         title: "Congressional candidate, Iowa"
//     },
//     "JOHN BOEHNER": {
//         name: "John Boehner",
//         title: "Speaker of the U.S. House of Representatives"
//     },
//     "JOHN HICKENLOOPER": {
//         name: "John W. Hickenlooper",
//         title: "Governor of Colorado"
//     },
//     "JOHN KASICH": {
//         name: "John Kasich",
//         title: "Governor of Ohio"
//     },
//     "JOHN KERRY": {
//         name: "John Kerry",
//         title: "U.S. senator, Massachusetts"
//     },
//     "JOHN LARSON": {
//         name: "John B. Larson",
//         title: "U.S. representative, Connecticut"
//     },
//     "JOHN LEWIS": {
//         name: "John Lewis",
//         title: "U.S. representative, Georgia"
//     },
//     "JOHN MCCAIN": {
//         name: "John McCain",
//         title: "U.S. senator, Arizona"
//     },
//     "JOHN NATHMAN": {
//         name: "John B. Nathman",
//         title: "Admiral, U.S. Navy, retired"
//     },
//     "JOHN PEREZ": {
//         name: "John A. Pérez",
//         title: "Speaker of the California State Assembly"
//     },
//     "JOHN SUNUNU": {
//         name: "John E. Sununu",
//         title: "Former U.S. senator, New Hampshire"
//     },
//     "JOHN THUNE": {
//         name: "John Thune",
//         title: "U.S. senator, South Dakota"
//     },
//     "JOYCE BEATTY": {
//         name: "Joyce Beatty",
//         title: "Congressional candidate, Ohio"
//     },
//     "JUDY CHU": {
//         name: "Judy Chu",
//         title: "U.S. representative, California"
//     },
//     "JULIAN CASTRO": {
//         name: "Julián Castro",
//         title: "Mayor of San Antonio"
//     },
//     "KAL PENN": {
//         name: "Kal Penn",
//         title: "Actor and former associate director, White House Office of Public Engagement"
//     },
//     "KAMALA HARRIS": {
//         name: "Kamala D. Harris",
//         title: "Attorney general of California"
//     },
//     "KAREN BASS": {
//         name: "Karen Bass",
//         title: "U.S. representative, California"
//     },
//     "KATHLEEN SEBELIUS": {
//         name: "Kathleen Sebelius",
//         title: "U.S. secretary of Health and Human Services"
//     },
//     "KAY HAGAN": {
//         name: "Kay Hagan",
//         title: "U.S. senator, North Carolina"
//     },
//     "KEITH ROTHFUS": {
//         name: "Keith Rothfus",
//         title: "Congressional candidate, Pennsylvania"
//     },
//     "KELLY AYOTTE": {
//         name: "Kelly Ayotte",
//         title: "U.S. senator, New Hampshire"
//     },
//     "KEN MYERS": {
//         name: "Ken Myers",
//         title: "Deputy sheriff, Carroll County, Iowa"
//     },
//     "KEN SALAZAR": {
//         name: "Ken Salazar",
//         title: "U.S. secretary of the Interior"
//     },
//     "KERRY HEALEY": {
//         name: "Kerry Healey",
//         title: "Former lieutenant governor, Massachusetts"
//     },
//     "KERRY WASHINGTON": {
//         name: "Kerry Washington",
//         title: "Actress"
//     },
//     "LAURA BUSH": {
//         name: "Laura Bush",
//         title: "Former first lady"
//     },
//     "LIBBY BRUCE": {
//         name: "Elizabeth Ann “Libby” Bruce"
//     },
//     "LINCOLN CHAFEE": {
//         name: "Lincoln Chafee",
//         title: "Governor of Rhode Island"
//     },
//     "LISA STICKAN": {
//         name: "Lisa Stickan",
//         title: "Young Republicans chairwoman, Ohio"
//     },
//     "LUCE VELA FORTUNO": {
//         name: "Lucé Vela Fortuño",
//         title: "First lady of Puerto Rico"
//     },
//     "LUIS FORTUNO": {
//         name: "Luis Fortuño",
//         title: "Governor of Puerto Rico"
//     },
//     "LUIS GUTIERREZ": {
//         name: "Luis V. Gutierrez",
//         title: "U.S. representative, Illinois"
//     },
//     "MARCO RUBIO": {
//         name: "Marco Rubio",
//         title: "U.S. senator, Florida"
//     },
//     "MARK MEADOWS": {
//         name: "Mark Meadows",
//         title: "Congressional candidate, North Carolina"
//     },
//     "MARTIN O'MALLEY": {
//         name: "Martin O’Malley",
//         title: "Governor of Maryland"
//     },
//     "MARY FALLIN": {
//         name: "Mary Fallin",
//         title: "Governor of Oklahoma"
//     },
//     "MARY KAY HENRY": {
//         name: "Mary Kay Henry",
//         title: "Service Employees International Union president"
//     },
//     "MAYA SOETORO-NG": {
//         name: "Maya Soetoro-Ng",
//         title: "Sister of Barack Obama"
//     },
//     "MEL WATT": {
//         name: "Melvin Watt",
//         title: "U.S. representative, North Carolina"
//     },
//     "MIA LOVE": {
//         name: "Mia Love",
//         title: "Congressional candidate, Utah"
//     },
//     "MICHAEL NUTTER": {
//         name: "Michael Nutter",
//         title: "Mayor of Philadelphia"
//     },
//     "MICHELLE OBAMA": {
//         name: "Michelle Obama",
//         title: "First lady"
//     },
//     "MICK CORNETT": {
//         name: "Mick Cornett",
//         title: "Mayor of Oklahoma City"
//     },
//     "MIKE HUCKABEE": {
//         name: "Mike Huckabee",
//         title: "Former governor of Arkansas"
//     },
//     "MITCH MCCONNELL": {
//         name: "Mitch McConnell",
//         title: "Senate Republican leader"
//     },
//     "MITT ROMNEY": {
//         name: "Mitt Romney",
//         title: "Presidential nominee"
//     },
//     "MR. ": {
//         title: "Unidentified Speaker"
//     },
//     "MS. ": {
//         title: "Unidentified Speaker"
//     },
//     "NANCY KEENAN": {
//         name: "Nancy Keenan",
//         title: "Naral Pro-Choice America, president"
//     },
//     "NANCY PELOSI": {
//         name: "Nancy Pelosi",
//         title: "House minority leader"
//     },
//     "NEWT GINGRICH": {
//         name: "Newt Gingrich",
//         title: "Former speaker of the House of Representatives"
//     },
//     "NIKKI HALEY": {
//         name: "Nikki Haley",
//         title: "Governor of South Carolina"
//     },
//     "NYDIA VELAZQUEZ": {
//         name: "Nydia Velázquez",
//         title: "U.S. representative, New York"
//     },
//     "PAM BONDI": {
//         name: "Pam Bondi",
//         title: "Attorney general of Florida"
//     },
//     "PAT QUINN": {
//         name: "Pat Quinn",
//         title: "Governor of Illinois"
//     },
//     "PATTY MURRAY": {
//         name: "Patty Murray",
//         title: "U.S. senator, Washington"
//     },
//     "PAUL RYAN": {
//         name: "Paul D. Ryan",
//         title: "Vice-presidential nominee"
//     },
//     "PEDRO PIERLUISI": {
//         name: "Pedro R. Pierluisi",
//         title: "Resident commissioner of Puerto Rico"
//     },
//     "PETE SESSIONS": {
//         name: "Pete Sessions",
//         title: "U.S. representative, Texas"
//     },
//     "PHIL ARCHULETTA": {
//         name: "Phil Archuletta",
//         title: "Small-business owner"
//     },
//     "QUICO CANSECO": {
//         name: "Francisco (Quico) Canseco",
//         title: "U.S. representative, Texas"
//     },
//     "R.T. RYBAK": {
//         name: "R.T. Rybak",
//         title: "Mayor of Minneapolis"
//     },
//     "RAE LYNNE CHORNENKY": {
//         name: "Rae Lynne Chornenky",
//         title: "National Federation of Republican Women president"
//     },
//     "RAHM EMANUEL": {
//         name: "Rahm Emanuel",
//         title: "Mayor of Chicago"
//     },
//     "RAND PAUL": {
//         name: "Rand Paul",
//         title: "U.S. senator, Kentucky"
//     },
//     "RANDY JOHNSON": {
//         name: "Randy Johnson",
//         title: "Former employee at a company controlled by Bain Capital"
//     },
//     "REINCE PRIEBUS": {
//         name: "Reince Priebus",
//         title: "Republican National Committee chairman"
//     },
//     "RICHARD BERG": {
//         name: "Rick Berg",
//         title: "U.S. representative, North Dakota"
//     },
//     "RICHARD DURBIN": {
//         name: "Richard J. Durbin",
//         title: "U.S. senator, Illinois"
//     },
//     "RICHARD HUDSON": {
//         name: "Richard Hudson",
//         title: "Congressional candidate, North Carolina"
//     },
//     "RICHARD TRUMKA": {
//         name: "Richard L. Trumka",
//         title: "President of the A.F.L.–C.I.O."
//     },
//     "RICK SANTORUM": {
//         name: "Rick Santorum",
//         title: "Former U.S. senator, Pennsylvania"
//     },
//     "RICKY GILL": {
//         name: "Ranjit (Ricky) Gill",
//         title: "Congressional candidate, California"
//     },
//     "ROB PORTMAN": {
//         name: "Rob Portman",
//         title: "U.S. senator, Ohio"
//     },
//     "ROBERT WEXLER": {
//         name: "Robert Wexler",
//         title: "Former U.S. representative, Florida"
//     },
//     "RON KAUFMAN": {
//         name: "Ron Kaufman",
//         title: "Romney campaign adviser"
//     },
//     "RON PAUL": {
//         name: "Ron Paul",
//         title: "U.S. representative, Texas"
//     },
//     "ROSA DELAURO": {
//         name: "Rosa DeLauro",
//         title: "U.S. representative, Connecticut"
//     },
//     "SAM OLENS": {
//         name: "Sam Olens",
//         title: "Attorney general of Georgia"
//     },
//     "SANDRA FLUKE": {
//         name: "Sandra Fluke",
//         title: "Lawyer and women’s rights activist"
//     },
//     "SCARLETT JOHANSSON": {
//         name: "Scarlett Johansson",
//         title: "Actress"
//     },
//     "SCOTT WALKER": {
//         name: "Scott Walker",
//         title: "Governor of Wisconsin"
//     },
//     "SEAN DUFFY": {
//         name: "Sean Duffy",
//         title: "U.S. representative, Wisconsin"
//     },
//     "SHARON DAY": {
//         name: "Sharon Day",
//         title: "Republican National Committee co-chair"
//     },
//     "SHER VALENZUELA": {
//         name: "Sher Valenzuela",
//         title: "Candidate for lieutenant governor, Delaware"
//     },
//     "SIMONE CAMPBELL": {
//         name: "Sister Simone Campbell",
//         title: "Executive director of Network"
//     },
//     "STENY HOYER": {
//         name: "Steny H. Hoyer",
//         title: "U.S. representative, Maryland"
//     },
//     "STENY HOYER": {
//         name: "Steny Hoyer",
//         title: "House minority whip"
//     },
//     "STEVE COHEN": {
//         name: "Steve Cohen",
//         title: "U.S. representative, Tennessee"
//     },
//     "STEVE DAINES": {
//         name: "Steve Daines",
//         title: "Congressional candidate, Montana"
//     },
//     "STEVE ISRAEL": {
//         name: "Steve Israel",
//         title: "U.S. representative, New York"
//     },
//     "STEVE KING": {
//         name: "Steve King",
//         title: "U.S. representative, Iowa"
//     },
//     "STEVE WESTLY": {
//         name: "Steve Westly",
//         title: "Former state controller and chief financial officer of California"
//     },
//     "SUSANA MARTINEZ": {
//         name: "Susana Martinez",
//         title: "Governor of New Mexico"
//     },
//     "TAMMY BALDWIN": {
//         name: "Tammy Baldwin",
//         title: "U.S. representative, Wisconsin"
//     },
//     "TAMMY DUCKWORTH": {
//         name: "Tammy Duckworth",
//         title: "Congressional candidate, Illinois"
//     },
//     "TED CRUZ": {
//         name: "Ted Cruz",
//         title: "Senate candidate, Texas"
//     },
//     "TED STRICKLAND": {
//         name: "Ted Strickland",
//         title: "Former governor of Ohio"
//     },
//     "THOMAS MENINO": {
//         name: "Thomas M. Menino",
//         title: "Mayor of Boston"
//     },
//     "TIM GRIFFIN": {
//         name: "Tim Griffin",
//         title: "U.S. representative, Arkansas"
//     },
//     "TIM KAINE": {
//         name: "Tim Kaine",
//         title: "Former governor of Virginia"
//     },
//     "TIM PAWLENTY": {
//         name: "Tim Pawlenty",
//         title: "Former governor of Minnesota"
//     },
//     "TIM SCOTT": {
//         name: "Tim Scott",
//         title: "U.S. representative, South Carolina"
//     },
//     "TOM STEYER": {
//         name: "Tom Steyer",
//         title: "Co-Founder of Advanced Energy Economy"
//     },
//     "TOM VILSACK": {
//         name: "Tom Vilsack",
//         title: "U.S. secretary of agriculture"
//     },
//     "TULSI GABBARD": {
//         name: "Tulsi Gabbard",
//         title: "Congressional candidate, Hawaii"
//     },
//     "WALTER DALTON": {
//         name: "Walter Dalton",
//         title: "Lieutenant Governor, North Carolina"
//     },
//     "XAVIER BECERRA": {
//         name: "Xavier Becerra",
//         title: "U.S. representative, California"
//     },
//     "YASH WADHWA": {
//         name: "Yash Wadhwa",
//         title: "Candidate for Wisconsin State Assembly"
//     }
// };

// data.topics = [{
//     name: "American dream",
//     re: /\b(American dream)\b/gi,
//     x: 558,
//     y: 181
//     }, {
//     name: "Arithmetic",
//     re: /\b(Arithmetic)\b/gi,
//     x: 43,
//     y: 203
//     }, {
//     name: "Auto",
//     re: /\b(Auto(?:mobile)?)\b/gi,
//     x: 58,
//     y: 265,
//     arrow: "auto"
//     }, {
//     name: "Better",
//     re: /\b(Better)\b/gi,
//     x: 618,
//     y: 201
//     }, {
//     name: "Biden",
//     re: /\b(Biden)\b/gi,
//     x: 361,
//     y: 256
//     }, {
//     name: "bin Laden",
//     re: /\b((?:Osama )?bin Laden)\b/gi,
//     x: 81,
//     y: 235
//     }, {
//     name: "Business",
//     re: /\b(business[a-z]*)\b/gi,
//     x: 692,
//     y: 319,
//     arrow: "business"
//     }, {
//     name: "Choice",
//     re: /\b(Choice)\b/gi,
//     x: 364,
//     y: 179
//     }, {
//     name: "Church",
//     re: /\b(church)\b/gi,
//     x: 862,
//     y: 217
//     }, {
//     name: "Debt",
//     re: /\b(Debt)\b/gi,
//     x: 620,
//     y: 339
//     }, {
//     name: "Economy",
//     re: /\b(econom[a-z]+)\b/gi,
//     x: 410,
//     y: 340
//     }, {
//     name: "Education",
//     re: /\b(Education)\b/gi,
//     x: 267,
//     y: 218
//     }, {
//     name: "Energy",
//     re: /\b(Energy)\b/gi,
//     x: 393,
//     y: 224
//     }, {
//     name: "Equal pay",
//     re: /\b(Equal pay)\b/gi,
//     x: 73,
//     y: 206
//     }, {
//     name: "Fail",
//     re: /\b(fail[a-z]*)\b/gi,
//     x: 721,
//     y: 230
//     }, {
//     name: "Fair",
//     re: /\b(Fair)\b/gi,
//     x: 109,
//     y: 212
//     }, {
//     name: "Faith",
//     re: /\b(faith)\b/gi,
//     x: 650,
//     y: 246
//     }, {
//     name: "Families",
//     re: /\b(famil[a-z]+)\b/gi,
//     x: 401,
//     y: 113
//     }, {
//     name: "Fight",
//     re: /\b(f[oi]ght[a-z]*)\b/gi,
//     x: 214,
//     y: 248
//     }, {
//     name: "Flag",
//     re: /\b(flag)\b/gi,
//     x: 829,
//     y: 215
//     }, {
//     name: "Forward",
//     re: /\b(Forward)\b/gi,
//     x: 139,
//     y: 177
//     }, {
//     name: "Freedom",
//     re: /\b(freedom)\b/gi,
//     x: 677,
//     y: 211
//     }, {
//     name: "God",
//     re: /\b(God)\b/gi,
//     x: 527,
//     y: 256
//     }, {
//     name: "Government",
//     re: /\b(Government)\b/gi,
//     x: 774,
//     y: 199
//     }, {
//     name: "Health",
//     re: /\b(Health)\b/gi,
//     x: 194,
//     y: 156
//     }, {
//     name: "Hope",
//     re: /\b(Hope)\b/gi,
//     x: 507,
//     y: 199
//     }, {
//     name: "Immigration",
//     re: /\b(immigra[a-z]+)\b/gi,
//     x: 435,
//     y: 244
//     }, {
//     name: "Invest",
//     re: /\b(Invest(?:ment|ments|ing)?)\b/gi,
//     x: 264,
//     y: 272
//     }, {
//     name: "Job creators",
//     re: /\b(job creator(?:s)?)\b/gi,
//     x: 802,
//     y: 248
//     }, {
//     name: "Jobs",
//     re: /\b(job[a-z]*)\b/gi,
//     x: 505,
//     y: 116
//     }, {
//     name: "Leadership",
//     re: /\b(leader[a-z]*)\b/gi,
//     x: 598,
//     y: 275
//     }, {
//     name: "Level playing field",
//     re: /\b(level(?: the)? playing field)\b/gi,
//     x: 52,
//     y: 228
//     }, {
//     name: "Marry",
//     re: /\b(marry|married|marriage)\b/gi,
//     x: 568,
//     y: 225
//     }, {
//     name: "Medicaid",
//     re: /\b(medicaid)\b/gi,
//     x: 143,
//     y: 223
//     }, {
//     name: "Medicare",
//     re: /\b(Medicare)\b/gi,
//     x: 225,
//     y: 304
//     }, {
//     name: "Middle class",
//     re: /\b(middle[- ]+class)\b/gi,
//     x: 120,
//     y: 268
//     }, {
//     name: "Millionaires",
//     re: /\b(millionaire(?:s)?)\b/gi,
//     x: 26,
//     y: 245
//     }, {
//     name: "Military",
//     re: /\b(military)\b/gi,
//     x: 316,
//     y: 205
//     }, {
//     name: "Obama",
//     re: /\b(Obama)\b/gi,
//     x: 287,
//     y: 124
//     }, {
//     name: "Obamacare",
//     re: /\b(Obamacare)\b/gi,
//     x: 687,
//     y: 253
//     }, {
//     name: "Oil / Gas",
//     re: /\b(oil|gas)\b/gi,
//     x: 476,
//     y: 236
//     }, {
//     name: "Red tape",
//     re: /\b(Red tape)\b/gi,
//     x: 915,
//     y: 225
//     }, {
//     name: "Regulation",
//     re: /\b(regulat[a-z]*)\b/gi,
//     x: 839,
//     y: 251
//     }, {
//     name: "Romney",
//     re: /\b(Romney)\b/gi,
//     x: 534,
//     y: 354
//     }, {
//     name: "Ryan",
//     re: /\b(Ryan)\b/gi,
//     x: 465,
//     y: 289
//     }, {
//     name: "Science",
//     re: /\b(science)\b/gi,
//     x: 349,
//     y: 222
//     }, {
//     name: "Seniors",
//     re: /\b(Seniors)\b/gi,
//     x: 224,
//     y: 199
//     }, {
//     name: "Small business",
//     re: /\b(small[- ]+business[a-z]*)\b/gi,
//     x: 597,
//     y: 140
//     }, {
//     name: "Spending",
//     re: /\b(spend[a-z]*)\b/gi,
//     x: 715,
//     y: 185
//     }, {
//     name: "Success",
//     re: /\b(succe[a-z]*)\b/gi,
//     x: 669,
//     y: 152
//     }, {
//     name: "Tax",
//     re: /\b(tax[a-z]*)\b/gi,
//     x: 444,
//     y: 187
//     }, {
//     name: "Unemployment",
//     re: /\b(unemploy[a-z]+)\b/gi,
//     x: 885,
//     y: 247,
//     arrow: "unemployment"
//     }, {
//     name: "Veteran",
//     re: /\b(veterans?)\b/gi,
//     x: 171,
//     y: 281
//     }, {
//     name: "Vote",
//     re: /\b(Vote|voter|voters|voting)\b/gi,
//     x: 314,
//     y: 252
//     }, {
//     name: "Wall Street",
//     re: /\b(Wall Street)\b/gi,
//     x: 164,
//     y: 243
//     }, {
//     name: "War",
//     re: /\b(war(?:s)?)\b/gi,
//     x: 401,
//     y: 274
//     }, {
//     name: "Women",
//     re: /\b(wom[ae]n)\b/gi,
//     x: 308,
//     y: 323,
//     arrow: "women"
//     }, {
//     name: "Workers",
//     re: /\b(workers?)\b/gi,
//     x: 179,
//     y: 206
// }].map(topic);

// data.topic = function(name) {
//     var t = topic({
//         name: name,
//         re: new RegExp("\\b(" + d3.requote(name) + ")\\b","gi")
//     }, data.topics.length);
//     data.topics.push(t);
//     return t;
// }
// ;

// function party(party) {
//     party.speeches = party.speeches.map(speech);
//     party.sections = sections(party.speeches);
//     party.wordCount = d3.sum(party.sections, function(d) {
//         return countWords(d.speech.text.substring(d.i, d.j));
//     });
//     return party;
// }

// function speech(text, i) {
//     return {
//         text: text,
//         id: i
//     };
// }

// function sections(speeches) {
//     var speakerRe = /(?:\n|^)([A-Z\.()\- ]+): /g
//       , sections = [];

//     speeches.forEach(function(speech) {
//         var speakerName = "AUDIENCE", match, i = speakerRe.lastIndex = 0;
//         while (match = speakerRe.exec(speech.text)) {
//             if (match.index > i)
//                 sections.push({
//                     speaker: speakerName,
//                     speech: speech,
//                     i: i,
//                     j: match.index
//                 });
//             speakerName = match[1];
//             i = speakerRe.lastIndex;
//         }
//         sections.push({
//             speaker: speakerName,
//             speech: speech,
//             i: i,
//             j: speech.text.length
//         });
//     });

//     return sections.filter(function(d) {
//         return !/^AUDIENCE\b/.test(d.speaker);
//     });
// }

// function topic(topic, i) {
//     topic.id = i;
//     topic.count = 0;
//     topic.cx = topic.x;
//     topic.cy = topic.y;

//     topic.parties = data.parties.map(function(party) {
//         var count = 0
//           , mentions = [];

//         // party.sections.forEach(function(section) {
//         //     var text = section.speech.text.substring(section.i, section.j), match;
//         //     topic.re.lastIndex = 0;
//         //     while (match = topic.re.exec(text)) {
//         //         ++count;
//         //         mentions.push({
//         //             topic: topic,
//         //             section: section,
//         //             i: section.i + match.index,
//         //             j: section.i + topic.re.lastIndex
//         //         });
//         //     }
//         // });

//         topic.count += count = count / party.wordCount * 25e3;
//         return {
//             count: count,
//             mentions: mentions
//         };
//     });

//     return topic;
// }

// function countWords(text) {
//     return text.split(/\s+/g).filter(function(d) {
//         return d !== "—";
//     }).length;
// }


// var width = 970
//   , height = 540;

// var collisionPadding = 4, clipPadding = 4, minRadius = 16, // minimum collision radius
// maxRadius = 65, // also determines collision search radius
// maxMentions = 100, // don't show full transcripts
// activeTopic;
// // currently-displayed topic

// var formatShortCount = d3.format(",.0f")
//   , formatLongCount = d3.format(".1f")
//   , formatCount = function(d) {
//     return (d < 10 ? formatLongCount : formatShortCount)(d);
// };

// var r = d3.scaleSqrt()
//           .domain([0, d3.max(data.topics, d => d.count)])
//           .range([0, maxRadius]);

// var force = d3.forceSimulation()
//               .force('charge', d3.forceManyBody())
//               // .size([width, height - 80])
//               .on("tick", tick);

// var node = d3.select(".g-nodes").selectAll(".g-node")
//   , label = d3.select(".g-labels").selectAll(".g-label")
//   , arrow = d3.select(".g-nodes").selectAll(".g-note-arrow");

// d3.select(".g-nodes").append("rect").attr("class", "g-overlay").attr("width", width).attr("height", height).on("click", clear);

// d3.select(window).on("hashchange", hashchange);

// d3.select("#g-form").on("submit", submit);

// updateTopics(data.topics);
// hashchange();

// // Update the known topics.
// function updateTopics(topics) {
//     topics.forEach(function(d) {
//         d.r = r(d.count);
//         d.cr = Math.max(minRadius, d.r);
//         d.k = fraction(d.parties[0].count, d.parties[1].count);
//         if (isNaN(d.k))
//             d.k = .5;
//         if (isNaN(d.x))
//             d.x = (1 - d.k) * width + Math.random();
//         d.bias = .5 - Math.max(.1, Math.min(.9, d.k));
//     });
//     force.nodes(data.topics = topics).start();
//     updateNodes();
//     updateLabels();
//     updateArrows();
//     tick({
//         alpha: 0
//     });
//     // synchronous update
// }

// // Update the displayed nodes.
// function updateNodes() {
//     node = node.data(data.topics, function(d) {
//         return d.name;
//     });

//     node.exit().remove();

//     var nodeEnter = node.enter().append("a").attr("class", "g-node").attr("xlink:href", function(d) {
//         return "#" + encodeURIComponent(d.name);
//     }).call(force.drag).call(linkTopic);

//     var democratEnter = nodeEnter.append("g").attr("class", "g-democrat");

//     democratEnter.append("clipPath").attr("id", function(d) {
//         return "g-clip-democrat-" + d.id;
//     }).append("rect");

//     democratEnter.append("circle");

//     var republicanEnter = nodeEnter.append("g").attr("class", "g-republican");

//     republicanEnter.append("clipPath").attr("id", function(d) {
//         return "g-clip-republican-" + d.id;
//     }).append("rect");

//     republicanEnter.append("circle");

//     nodeEnter.append("line").attr("class", "g-split");

//     node.selectAll("rect").attr("y", function(d) {
//         return -d.r - clipPadding;
//     }).attr("height", function(d) {
//         return 2 * d.r + 2 * clipPadding;
//     });

//     node.select(".g-democrat rect").style("display", function(d) {
//         return d.k > 0 ? null : "none"
//     }).attr("x", function(d) {
//         return -d.r - clipPadding;
//     }).attr("width", function(d) {
//         return 2 * d.r * d.k + clipPadding;
//     });

//     node.select(".g-republican rect").style("display", function(d) {
//         return d.k < 1 ? null : "none"
//     }).attr("x", function(d) {
//         return -d.r + 2 * d.r * d.k;
//     }).attr("width", function(d) {
//         return 2 * d.r;
//     });

//     node.select(".g-democrat circle").attr("clip-path", function(d) {
//         return d.k < 1 ? "url(#g-clip-democrat-" + d.id + ")" : null;
//     });

//     node.select(".g-republican circle").attr("clip-path", function(d) {
//         return d.k > 0 ? "url(#g-clip-republican-" + d.id + ")" : null;
//     });

//     node.select(".g-split").attr("x1", function(d) {
//         return -d.r + 2 * d.r * d.k;
//     }).attr("y1", function(d) {
//         return -Math.sqrt(d.r * d.r - Math.pow(-d.r + 2 * d.r * d.k, 2));
//     }).attr("x2", function(d) {
//         return -d.r + 2 * d.r * d.k;
//     }).attr("y2", function(d) {
//         return Math.sqrt(d.r * d.r - Math.pow(-d.r + 2 * d.r * d.k, 2));
//     });

//     node.selectAll("circle").attr("r", function(d) {
//         return r(d.count);
//     });
// }

// // Update the displayed node labels.
// function updateLabels() {
//     label = label.data(data.topics, function(d) {
//         return d.name;
//     });

//     label.exit().remove();

//     var labelEnter = label.enter().append("a").attr("class", "g-label").attr("href", function(d) {
//         return "#" + encodeURIComponent(d.name);
//     }).call(force.drag).call(linkTopic);

//     labelEnter.append("div").attr("class", "g-name").text(function(d) {
//         return d.name;
//     });

//     labelEnter.append("div").attr("class", "g-value");

//     label.style("font-size", function(d) {
//         return Math.max(8, d.r / 2) + "px";
//     }).style("width", function(d) {
//         return d.r * 2.5 + "px";
//     });

//     // Create a temporary span to compute the true text width.
//     label.append("span").text(function(d) {
//         return d.name;
//     }).each(function(d) {
//         d.dx = Math.max(d.r * 2.5, this.getBoundingClientRect().width);
//     }).remove();

//     label.style("width", function(d) {
//         return d.dx + "px";
//     }).select(".g-value").text(function(d) {
//         return formatShortCount(d.parties[0].count) + " - " + formatShortCount(d.parties[1].count);
//     });

//     // Compute the height of labels when wrapped.
//     label.each(function(d) {
//         d.dy = this.getBoundingClientRect().height;
//     });
// }

// // Update the active topic.
// function updateActiveTopic(topic) {
//     d3.selectAll(".g-head").attr("class", topic ? "g-head g-has-topic" : "g-head g-hasnt-topic");
//     if (activeTopic = topic) {
//         node.classed("g-selected", function(d) {
//             return d === topic;
//         });
//         updateMentions(findMentions(topic));
//         d3.selectAll(".g-head a").text(topic.name);
//         d3.select(".g-democrat .g-head span.g-count").text(formatCount(topic.parties[0].count));
//         d3.select(".g-republican .g-head span.g-count").text(formatCount(topic.parties[1].count));
//     } else {
//         node.classed("g-selected", false);
//         updateMentions(sampleMentions());
//         d3.selectAll(".g-head a").text("various topics");
//         d3.selectAll(".g-head span.g-count").text("some number of");
//     }
// }

// // Update displayed excerpts.
// function updateMentions(mentions) {
//     var column = d3.selectAll(".g-mentions").data(mentions);

//     column.select(".g-truncated").style("display", function(d) {
//         return d.truncated ? "block" : null;
//     });

//     var mention = column.selectAll(".g-mention").data(groupMentionsBySpeaker, function(d) {
//         return d.key;
//     });

//     mention.exit().remove();

//     mention.selectAll("p").remove();

//     var mentionEnter = mention.enter().insert("div", ".g-truncated").attr("class", "g-mention");

//     mentionEnter.append("div").attr("class", "g-speaker").text(function(d) {
//         var s = data.speakers[d.key];
//         return s ? s.name : d.key;
//     });

//     mentionEnter.append("div").attr("class", "g-speaker-title").text(function(d) {
//         var s = data.speakers[d.key];
//         return s && s.title;
//     });

//     mention.sort(function(a, b) {
//         return b.values.length - a.values.length;
//     });

//     var p = mention.selectAll("p").data(function(d) {
//         return d.values;
//     }).enter().append("p").html(function(d) {
//         return d.section.speech.text.substring(d.start, d.end).replace(d.topic.re, "<a>$1</a>");
//     });

//     if (activeTopic) {
//         p.attr("class", "g-hover");
//     } else {
//         p.each(function(d) {
//             d3.select(this).selectAll("a").datum(d.topic).attr("href", "#" + encodeURIComponent(d.topic.name)).call(linkTopic);
//         });
//     }
// }

// // Bind the arrow path elements with their associated topic.
// function updateArrows() {
//     arrow = arrow.data(data.topics.filter(function(d) {
//         return d.arrow;
//     }), function(d) {
//         return this.id ? this.id.substring(8) : d.arrow;
//     });
// }

// // Return a random sample of mentions per party, one per topic.
// // Mentions are returned in chronological order.
// function sampleMentions() {
//     return data.parties.map(function(party, i) {
//         return data.topics.map(function(d) {
//             return d.parties[i].mentions;
//         }).filter(function(d) {
//             return d.length;
//         }).map(function(d) {
//             return d[Math.floor(Math.random() * d.length)];
//         }).sort(orderMentions);
//     });
// }

// // Return displayable mentions per party for the specified topic.
// // If too many, a random sample of matching mentions is returned.
// // Mentions are returned in chronological order.
// function findMentions(topic) {
//     return data.parties.map(function(party, i) {
//         var mentions = topic.parties[i].mentions;
//         if (mentions.length > maxMentions) {
//             shuffle(mentions).length = maxMentions;
//             mentions.sort(orderMentions);
//             mentions.truncated = true;
//         }
//         return mentions;
//     });
// }

// // Group mentions by speaker, collapse overlapping excerpts.
// function groupMentionsBySpeaker(mentions) {
//     return d3.nest().key(function(d) {
//         return d.section.speaker;
//     }).rollup(collapseMentions).entries(mentions);
// }

// // Given an array of mentions, computes the start and end point of the context
// // excerpt, and then collapses any overlapping excerpts.
// function collapseMentions(mentions) {
//     var sentenceRe = /([!?.)]+)\s+/g, // sentence splitting requires NLP
//     i, n = mentions.length, d0, d1;

//     // First compute the excerpt contexts.
//     for (i = 0; i < n; ++i) {
//         d0 = mentions[i];
//         d0.start = excerptStart(d0);
//         d0.end = excerptEnd(d0);
//     }

//     // Then collapse any overlapping excerpts (from the same speech).
//     for (i = 1,
//     d1 = mentions[0]; i < n; ++i) {
//         d0 = d1;
//         d1 = mentions[i];
//         if (d1.section.speech.id === d0.section.speech.id && d1.start >= d0.start && d1.start < d0.end) {
//             d1.start = -1;
//             d0.end = d1.end;
//             d1 = d0;
//         }
//     }

//     // Returns the start index of the excerpt for the specified mention.
//     function excerptStart(mention) {
//         var i = sentenceRe.lastIndex = Math.max(mention.section.i, mention.i - 80), match;
//         while (match = sentenceRe.exec(mention.section.speech.text)) {
//             if (match.index < mention.i - 20)
//                 return match.index + match[0].length;
//             if (i <= mention.section.i)
//                 break;
//             sentenceRe.lastIndex = i = Math.max(mention.section.i, i - 20);
//         }
//         return mention.section.i;
//     }

//     // Returns the end index of the excerpt for the specified mention.
//     function excerptEnd(mention) {
//         var i = mention.section.j, match;
//         sentenceRe.lastIndex = mention.j + 40;
//         match = sentenceRe.exec(mention.section.speech.text);
//         return match ? Math.min(match.index + match[1].length, i) : i;
//     }

//     return mentions.filter(function(d) {
//         return d.start >= 0;
//     });
// }

// // Orders mentions chronologically: by speech and position within speech.
// function orderMentions(a, b) {
//     return a.section.speech.id - b.section.speech.id || a.i - b.i;
// }

// // Assign event handlers to topic links.
// function linkTopic(a) {
//     a.on("click", click).on("mouseover", mouseover).on("mouseout", mouseout);
// }

// // Returns the topic matching the specified name, approximately.
// // If no matching topic is found, returns undefined.
// function findTopic(name) {
//     for (var i = 0, n = data.topics.length, t; i < n; ++i) {
//         if ((t = data.topics[i]).name === name || new RegExp("^" + (t = data.topics[i]).re.source + "$","i").test(name)) {
//             return t;
//         }
//     }
// }

// // Returns the topic matching the specified name, approximately.
// // If no matching topic is found, a new one is created.
// function findOrAddTopic(name) {
//     var topic = findTopic(name);
//     if (!topic) {
//         topic = data.topic(name.substring(0, 1).toUpperCase() + name.substring(1));
//         topic.y = 0;
//         updateTopics(data.topics);
//     }
//     return topic;
// }

// // Simulate forces and update node and label positions on tick.
// function tick(e) {
//     node.each(bias(e.alpha * 105)).each(collide(.5)).attr("transform", function(d) {
//         return "translate(" + d.x + "," + d.y + ")";
//     });

//     label.style("left", function(d) {
//         return (d.x - d.dx / 2) + "px";
//     }).style("top", function(d) {
//         return (d.y - d.dy / 2) + "px";
//     });

//     arrow.style("stroke-opacity", function(d) {
//         var dx = d.x - d.cx
//           , dy = d.y - d.cy;
//         return dx * dx + dy * dy < d.r * d.r ? 1 : 0;
//     });
// }

// // A left-right bias causing topics to orient by party preference.
// function bias(alpha) {
//     return function(d) {
//         d.x += d.bias * alpha;
//     }
//     ;
// }

// // Resolve collisions between nodes.
// function collide(alpha) {
//     var q = d3.geom.quadtree(data.topics);
//     return function(d) {
//         var r = d.cr + maxRadius + collisionPadding
//           , nx1 = d.x - r
//           , nx2 = d.x + r
//           , ny1 = d.y - r
//           , ny2 = d.y + r;
//         q.visit(function(quad, x1, y1, x2, y2) {
//             if (quad.point && (quad.point !== d) && d.other !== quad.point && d !== quad.point.other) {
//                 var x = d.x - quad.point.x
//                   , y = d.y - quad.point.y
//                   , l = Math.sqrt(x * x + y * y)
//                   , r = d.cr + quad.point.r + collisionPadding;
//                 if (l < r) {
//                     l = (l - r) / l * alpha;
//                     d.x -= x *= l;
//                     d.y -= y *= l;
//                     quad.point.x += x;
//                     quad.point.y += y;
//                 }
//             }
//             return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
//         });
//     }
//     ;
// }

// // Fisher–Yates shuffle.
// function shuffle(array) {
//     var m = array.length, t, i;
//     while (m) {
//         i = Math.floor(Math.random() * m--);
//         t = array[m];
//         array[m] = array[i];
//         array[i] = t;
//     }
//     return array;
// }

// // Given two quantities a and b, returns the fraction to split the circle a + b.
// function fraction(a, b) {
//     var k = a / (a + b);
//     if (k > 0 && k < 1) {
//         var t0, t1 = Math.pow(12 * k * Math.PI, 1 / 3);
//         for (var i = 0; i < 10; ++i) {
//             // Solve for theta numerically.
//             t0 = t1;
//             t1 = (Math.sin(t0) - t0 * Math.cos(t0) + 2 * k * Math.PI) / (1 - Math.cos(t0));
//         }
//         k = (1 - Math.cos(t1 / 2)) / 2;
//     }
//     return k;
// }

// // Update the active topic on hashchange, perhaps creating a new topic.
// function hashchange() {
//     var name = decodeURIComponent(location.hash.substring(1)).trim();
//     updateActiveTopic(name && name != "!" ? findOrAddTopic(name) : null);
// }

// // Trigger a hashchange on submit.
// function submit() {
//     var name = this.search.value.trim();
//     location.hash = name ? encodeURIComponent(name) : "!";
//     this.search.value = "";
//     d3.event.preventDefault();
// }

// // Clear the active topic when clicking on the chart background.
// function clear() {
//     location.replace("#!");
// }

// // Rather than flood the browser history, use location.replace.
// function click(d) {
//     location.replace("#" + encodeURIComponent(d === activeTopic ? "!" : d.name));
//     d3.event.preventDefault();
// }

// // When hovering the label, highlight the associated node and vice versa.
// // When no topic is active, also cross-highlight with any mentions in excerpts.
// function mouseover(d) {
//     node.classed("g-hover", function(p) {
//         return p === d;
//     });
//     if (!activeTopic)
//         d3.selectAll(".g-mention p").classed("g-hover", function(p) {
//             return p.topic === d;
//         });
// }

// // When hovering the label, highlight the associated node and vice versa.
// // When no topic is active, also cross-highlight with any mentions in excerpts.
// function mouseout(d) {
//     node.classed("g-hover", false);
//     if (!activeTopic)
//         d3.selectAll(".g-mention p").classed("g-hover", false);
// }

