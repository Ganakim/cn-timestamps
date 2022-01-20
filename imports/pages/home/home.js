import './home.html'

Template.home.onCreated(()=>{
  // if(Session.get('d') && Session.get('u') && Session.get('p')){
  //   getTimestamps()
  //   Session.set('needsLogin', false)
  //   Session.set('loading', true)
  // }else{
  //   Session.set('needsLogin', true)
  // }
  // Session.set('loginErrors', '')
  Session.set('loading', false)
  Session.set('needsLogin', false)
  Session.set('Grades', {
    "Parker": {
        "Colin": 1611903600000,
        "Joshua": 1591423200000
    },
    "Wiggins": {
        "Bridger": 1602050400000
    },
    "Robins": {
        "Brandon": 1555221600000,
        "Brody": 1574492400000,
        "Jake": 1574492400000,
        "Tanner": 1555221600000
    },
    "Turner": {
        "Caden": 1566453600000
    },
    "Payne": {
        "Joseph": 1562047200000
    },
    "Johnson": {
        "Kenton": 1573196400000,
        "Aggie": 1601359200000,
        "Sterling": 1618380000000,
        "Weston": 1616738400000,
        "Korben": 1583564400000,
        "Melayna": 1582873200000,
        "Chase": 1573628400000,
        "Daniel": 1560319200000,
        "Ethan": 1569304800000,
        "Logan": 1572937200000,
        "Jaxten": 1642575600000,
        "Carter": 1642662000000
    },
    "Maddox": {
        "Kevin": 1560837600000
    },
    "Cornwall": {
        "Spencer": 1611385200000
    },
    "Holt": {
        "Shanna": 1557900000000
    },
    "Bergstrom": {
        "Berkley": 1569650400000
    },
    "Bird": {
        "Nicholas": 1597816800000,
        "Jack": 1594101600000
    },
    "Wesley": {
        "Katie": 1575788400000,
        "Parker": 1559973600000,
        "Justin": 1557900000000,
        "Rebecca": 1554962400000
    },
    "Kendall": {
        "Kylan": 1637132400000,
        "Jad": 1572415200000,
        "Ky": 1642143600000
    },
    "Fowler": {
        "Levi": 1628834400000
    },
    "Taylor": {
        "Reagan": 1583564400000,
        "Meira": 1557900000000,
        "Mason": 1639033200000
    },
    "Evans": {
        "Jackson": 1558677600000
    },
    "Brown": {
        "Mavrick": 1555135200000,
        "Calvin": 1565676000000,
        "Cassidy": 1582873200000,
        "Harrison": 1628834400000,
        "Zayne": 1636700400000
    },
    "Antczak": {
        "Nathan": 1597125600000,
        "Joshua": 1597125600000
    },
    "Nelson": {
        "Kaden": 1597816800000
    },
    "Morgan": {
        "Lucas": 1641538800000
    },
    "Kelly": {
        "Caleb": 1639119600000,
        "Braxton": 1584079200000
    },
    "Thatcher": {
        "Isaac": 1636005600000
    },
    "Lewis": {
        "Kyle": 1640588400000
    },
    "Stephenson": {
        "Xander": 1579935600000,
        "Masimo": 1574665200000
    },
    "Prasanna Kumar": {
        "Sanjana": 1582873200000
    },
    "Mair": {
        "William": 1641452400000
    },
    "Sommer": {
        "Jaxon": 1641625200000
    },
    "Nunley": {
        "Garrison": 1571724000000
    },
    "Christodoulou": {
        "Ethan": 1634796000000
    },
    "Faisal": {
        "Hussain": 1583992800000,
        "Hassan": 1583992800000
    },
    "Millerberg": {
        "Jackson": 1641538800000
    },
    "Staggs": {
        "Brennan": 1583305200000
    },
    "Reyes": {
        "Roman": 1574406000000,
        "Anthony": 1574406000000
    },
    "Hepworth": {
        "Tyson": 1617688800000
    },
    "Tate": {
        "Evan": 1555135200000
    },
    "Owen": {
        "Raegan": 1559282400000
    },
    "Pilcher": {
        "Gage": 1561528800000,
        "Carter": 1560751200000
    },
    "Smith": {
        "Roman": 1553839200000,
        "Zoe": 1641884400000,
        "Ryker": 1642230000000,
        "Brody": 1642662000000
    },
    "Rush": {
        "Eli": 1607410800000
    },
    "Hartley": {
        "Landon": 1626847200000
    },
    "Saldana": {
        "Isaac": 1579503600000
    },
    "Davis": {
        "Austin": 1554271200000
    },
    "Kenney": {
        "Tegan": 1583391600000
    },
    "Schindewolf": {
        "Isaac": 1640761200000,
        "Caleb": 1642489200000
    },
    "lechtenberg": {
        "owen": 1559800800000
    },
    "Saini": {
        "Jaskirat": 1566367200000
    },
    "Kinikini": {
        "Tavim": 1625637600000
    },
    "frame": {
        "kyra": 1580972400000
    },
    "Williamson": {
        "Jackson": 1563861600000
    },
    "Hinrichsen": {
        "Denver": 1583305200000,
        "Hailey": 1580367600000
    },
    "Heywood": {
        "Leland": 1584079200000
    },
    "Wilding": {
        "Hunter": 1564034400000
    },
    "Reddoch": {
        "Judah": 1573196400000,
        "Asher": 1573196400000
    },
    "Holmberg": {
        "Jocee": 1557381600000
    },
    "Olofson": {
        "Lukas": 1636441200000
    },
    "Gulbranson": {
        "Kael": 1630130400000,
        "Max": 1642230000000
    },
    "McCoy": {
        "Gage": 1640242800000
    },
    "Robinson": {
        "Cash": 1561183200000,
        "Tyler": 1642489200000
    },
    "Cuevas": {
        "Kendrick": 1581663600000
    },
    "Dickinson": {
        "Austin": 1636959600000
    },
    "Argyle": {
        "Caeden": 1567836000000
    },
    "Kjar": {
        "Jaxon": 1554184800000
    },
    "Stocking": {
        "Zachary": 1583564400000
    },
    "Ellsworth": {
        "Joseph": 1590818400000,
        "James": 1576652400000
    },
    "Seivert": {
        "Ethan": 1560232800000
    },
    "Mitchell": {
        "Ciara": 1564207200000
    },
    "Mitchell Jr": {
        "Patrick": 1563170400000
    },
    "Christensen": {
        "Corbin": 1583992800000
    },
    "Hansen": {
        "Logan": 1583564400000,
        "Lucille": 1642057200000
    },
    "Sturges": {
        "Kysen": 1631772000000
    },
    "Mason": {
        "Bronson": 1582873200000,
        "Bridger": 1576479600000
    },
    "Nielson": {
        "Jordan": 1635400800000,
        "Lucas": 1641452400000
    },
    "Bauer": {
        "Dominic": 1620799200000,
        "Steven": 1637305200000
    },
    "Hooley": {
        "Nikolas": 1559196000000
    },
    "Knighton": {
        "Noah": 1560837600000
    },
    "Brand": {
        "Noa": 1572328800000
    },
    "Creager": {
        "Parker": 1592546400000,
        "Daxton": 1578466800000
    },
    "Kichenaradjou": {
        "Aleron": 1638601200000
    },
    "walker": {
        "lindsey": 1557122400000
    },
    "Willis": {
        "Corbin": 1583305200000
    },
    "Hasegawa": {
        "Case": 1583391600000
    },
    "Neff": {
        "Nathanael": 1640156400000
    },
    "Gaytan": {
        "Lilyana": 1571983200000
    },
    "Anderson": {
        "Cora": 1623218400000,
        "Caleb": 1573714800000,
        "Luke": 1642575600000
    },
    "Wilden": {
        "Ethan": 1583564400000
    },
    "Loumis": {
        "Anthony": 1555653600000
    },
    "Cronin": {
        "Brice": 1582354800000
    },
    "Kenick": {
        "Jacob": 1566367200000
    },
    "Muren": {
        "Josh": 1566799200000
    },
    "Castillo": {
        "Jaslene": 1583906400000
    },
    "Sneddon": {
        "Gwen": 1566194400000
    },
    "Cardon": {
        "Bentley": 1564639200000
    },
    "Maiava": {
        "Alma": 1561701600000
    },
    "Benson": {
        "Rayden": 1567144800000
    },
    "Peck": {
        "Marshall": 1579676400000
    },
    "Ellis": {
        "Sebastian": 1582095600000,
        "Tayden": 1641538800000
    },
    "Bartlett": {
        "Parker": 1570773600000
    },
    "Petty": {
        "Jace": 1622872800000
    },
    "Eschler": {
        "Jayden": 1642230000000
    },
    "Twitchell": {
        "Tavi": 1581145200000,
        "Tayt": 1581145200000
    },
    "Rhodes": {
        "Cayson": 1583820000000
    },
    "Gebregiorgis": {
        "Nathaniel": 1582873200000
    },
    "Stipanovich": {
        "Romen": 1610002800000
    },
    "Williams": {
        "Henry": 1577948400000
    },
    "McNichols": {
        "Lucas": 1573110000000
    },
    "Brockbank": {
        "Zach": 1581145200000,
        "Bennett": 1581404400000
    },
    "Puzey": {
        "Malcolm": 1594360800000
    },
    "Nielsen": {
        "Rylan": 1631599200000,
        "Adin": 1642230000000
    },
    "Saeed": {
        "Laawick": 1615874400000
    },
    "Sykes": {
        "Ian": 1561096800000
    },
    "Marks": {
        "Drew": 1560924000000,
        "Elijah": 1561096800000
    },
    "Jack": {
        "Dorian": 1561096800000
    },
    "Rosen": {
        "Jordan": 1561096800000
    },
    "Warren": {
        "Owen": 1561096800000,
        "Wilson": 1561096800000
    },
    "Gomez": {
        "Balam": 1583564400000,
        "Gio": 1583564400000
    },
    "Russell": {
        "Kayden": 1577084400000
    },
    "McDonald": {
        "Carter": 1561096800000
    },
    "Chidambaram": {
        "Namin": 1561010400000
    },
    "McDaniel": {
        "MAX": 1561010400000
    },
    "Naylor": {
        "Isaac": 1561096800000
    },
    "Probst": {
        "Shayla": 1560751200000
    },
    "Pratham": {
        "Ayush": 1561096800000
    },
    "Phillips": {
        "Nathan": 1642057200000,
        "Austin": 1594620000000
    },
    "Bandalapalli": {
        "Yashvi": 1582959600000
    },
    "Farrell": {
        "Matthew": 1565244000000
    },
    "Geary": {
        "Ben": 1582009200000
    },
    "Cooper": {
        "Gavin": 1564120800000
    },
    "Bates": {
        "Davis": 1583218800000
    },
    "Afzal": {
        "Maryam": 1638601200000
    },
    "Baker": {
        "Mason": 1564120800000,
        "Koan": 1582268400000
    },
    "Manyukwa": {
        "Tozi": 1582959600000
    },
    "Le": {
        "Mykah": 1583992800000,
        "Cable": 1583906400000,
        "Braxton": 1594879200000
    },
    "TATRO": {
        "JOHNATHAN": 1564812000000
    },
    "Pace": {
        "Carson": 1565244000000
    },
    "Bhandari": {
        "William": 1565244000000
    },
    "Disher": {
        "Anabel": 1639810800000
    },
    "Simons": {
        "Braxton": 1565330400000
    },
    "Frampton": {
        "Harley": 1565244000000
    },
    "Chang": {
        "Matt": 1641625200000
    },
    "Bath": {
        "Sylas": 1583391600000
    },
    "Jones": {
        "Athen": 1600754400000,
        "Zephyr": 1580281200000,
        "Porter": 1630994400000
    },
    "Sooram": {
        "Ishanth": 1582959600000
    },
    "Palacios": {
        "Brandon": 1640242800000
    },
    "Mole": {
        "Anthony": 1573196400000
    },
    "Cobb": {
        "Fletcher": 1601100000000
    },
    "Zaudke": {
        "Ace": 1583992800000
    },
    "Wilcox": {
        "Jaden": 1581490800000
    },
    "Foard": {
        "Cohen": 1576911600000
    },
    "Wells": {
        "Jeremiah": 1569391200000,
        "Kasen": 1590040800000,
        "Isaac": 1642230000000,
        "William": 1576911600000
    },
    "Hodges": {
        "Alexis": 1584079200000
    },
    "Freeman": {
        "Isabella": 1582959600000,
        "Violet": 1582095600000
    },
    "Ross": {
        "Gabriel": 1581404400000,
        "Logan": 1573714800000,
        "Luke": 1593237600000,
        "Ariel": 1593237600000,
        "Coleman": 1578985200000,
        "Ryan": 1576566000000
    },
    "Widmaier": {
        "Max": 1615532400000
    },
    "Newcomb": {
        "Julian": 1629439200000
    },
    "Patchen": {
        "Colin": 1582268400000
    },
    "Rodenbaugh": {
        "Kai": 1615446000000
    },
    "Wojchowski": {
        "Ruger": 1590818400000
    },
    "Moreno-Garcia": {
        "Andre": 1574492400000
    },
    "Barlow": {
        "Kameron": 1582614000000
    },
    "Cragun": {
        "Kyler": 1640156400000
    },
    "Drage": {
        "Aidan": 1583906400000
    },
    "Dawes": {
        "Landen": 1612594800000
    },
    "Ford": {
        "Robert": 1583564400000
    },
    "Berube": {
        "Josh": 1579590000000
    },
    "Messel": {
        "Ethan": 1582959600000,
        "Oliver": 1582959600000
    },
    "Sepp": {
        "Graham": 1575615600000
    },
    "Hikade": {
        "Logan": 1641625200000
    },
    "Salak": {
        "Stone": 1581750000000
    },
    "Skousen": {
        "Miles": 1583992800000,
        "Nolan": 1583992800000
    },
    "Ure": {
        "Cache": 1635919200000
    },
    "Foster": {
        "Connar": 1597903200000
    },
    "Summers": {
        "Zane": 1635228000000
    },
    "Altmann": {
        "Christine": 1579935600000,
        "Hailey": 1579935600000
    },
    "Huggins": {
        "Kora": 1582354800000
    },
    "Rojas": {
        "Luigi": 1640156400000
    },
    "Robbins": {
        "Ethan": 1583218800000
    },
    "Huff": {
        "Joshua": 1601532000000
    },
    "Jenson": {
        "Carter": 1581750000000
    },
    "Chapple": {
        "Lincoln": 1597212000000
    },
    "Allsop": {
        "Kal'el": 1578121200000
    },
    "Arvidson": {
        "Kurtis": 1583992800000,
        "Annie": 1582700400000,
        "Mikah": 1581577200000
    },
    "Sandoval": {
        "Jack": 1595484000000,
        "Aryhanna": 1636441200000
    },
    "Andrews": {
        "Lily": 1642230000000
    },
    "Jorgensen": {
        "Sterling": 1579762800000,
        "Trevor": 1579762800000
    },
    "Hooke": {
        "Boston": 1583391600000
    },
    "Soper": {
        "Oliver": 1578639600000
    },
    "Dyal": {
        "Aerin": 1593669600000,
        "Jonathan": 1582095600000
    },
    "Richter": {
        "Eli": 1580540400000
    },
    "Alldredge": {
        "Cache": 1583992800000
    },
    "Morris": {
        "Jensen": 1579762800000
    },
    "Stroman": {
        "Dexter": 1642575600000
    },
    "Koelliker": {
        "Xander": 1642662000000
    },
    "Chacon": {
        "Ramon": 1584079200000
    },
    "Polgar": {
        "Adrian": 1583391600000
    },
    "Mlaker": {
        "Ali": 1636178400000,
        "Ava": 1636005600000
    },
    "Call": {
        "Jericho": 1583992800000
    },
    "Wiser": {
        "Cole": 1581145200000
    },
    "Tann": {
        "Valin": 1583906400000,
        "Rohan": 1583906400000
    },
    "Dill": {
        "Carson": 1583478000000
    },
    "Carruthers": {
        "Ty": 1584079200000
    },
    "Vanson": {
        "Salvator": 1606287600000
    },
    "Morrow": {
        "Asher": 1631340000000
    },
    "Mau": {
        "Caleb": 1583906400000
    },
    "Moody": {
        "Mallory": 1594274400000
    },
    "Bogart": {
        "Lawson": 1591164000000
    },
    "Roberts": {
        "Mercedes": 1642575600000
    },
    "Wright": {
        "Bentley": 1592892000000
    },
    "Campbell": {
        "Bane": 1616047200000
    },
    "Murphy": {
        "Brooks": 1593669600000
    },
    "Marriott": {
        "Jacob": 1594879200000
    },
    "Vorwaller": {
        "Beckett": 1642575600000
    },
    "Funes": {
        "Aiden": 1600149600000
    },
    "DeLand": {
        "Ashton": 1599199200000
    },
    "Flammer": {
        "Sawyer": 1600408800000,
        "Boston": 1600408800000
    },
    "Downey": {
        "Sam": 1636786800000
    },
    "Eyerly": {
        "Ammon": 1600668000000
    },
    "Francis": {
        "Julia": 1639810800000,
        "Peter": 1599890400000
    },
    "Broili": {
        "Garrett": 1622268000000
    },
    "Clifford": {
        "Jude": 1630389600000
    },
    "Abdirahman": {
        "Ilyas": 1637218800000
    },
    "Domingo": {
        "Maxwell": 1634882400000
    },
    "Sharma": {
        "Aadrit": 1611903600000
    },
    "Palmer": {
        "Finn": 1636092000000
    },
    "Doxey": {
        "Ethan": 1602309600000,
        "Owen": 1625896800000
    },
    "Blohm": {
        "Stella": 1602568800000
    },
    "Bathula": {
        "Adam": 1603260000000
    },
    "Rosas": {
        "Alejandro": 1626415200000,
        "Analeigha": 1634796000000
    },
    "Ballou": {
        "Collin": 1605596400000
    },
    "White": {
        "Tyson": 1618552800000
    },
    "Belcher": {
        "Bennett": 1609398000000,
        "Brock": 1609398000000
    },
    "Hammond": {
        "Paige": 1611298800000
    },
    "(Ash) Havili": {
        "Anthony": 1608361200000
    },
    "Swenson": {
        "Sean": 1641884400000
    },
    "Goodrich": {
        "Jonathan": 1619848800000
    },
    "Ganesh": {
        "Triana": 1641625200000
    },
    "Cerrudo": {
        "Emmanuel": 1637391600000,
        "Joseph": 1640674800000
    },
    "Brusseau": {
        "Cooper": 1641279600000
    },
    "Redfern": {
        "Gavin": 1639033200000
    },
    "Jensen": {
        "Max": 1615532400000,
        "Henry": 1615359600000
    },
    "Hoopes": {
        "Jonah": 1623477600000
    },
    "Reyna": {
        "Abel": 1641970800000
    },
    "Copeland": {
        "Luke": 1618812000000,
        "Calvin": 1618812000000
    },
    "Musare": {
        "Melvin": 1639983600000,
        "Jonathan": 1641970800000
    },
    "Gundersen": {
        "Eli": 1642230000000,
        "John": 1642230000000
    },
    "Lima": {
        "Nicholas": 1614322800000
    },
    "Daynes": {
        "Chase": 1619762400000
    },
    "Baldwin": {
        "Axton": 1642489200000
    },
    "Rodriguez": {
        "Andre": 1621058400000
    },
    "Jandieri": {
        "Henry": 1642489200000
    },
    "Nguyen": {
        "Huy": 1613804400000
    },
    "Birch": {
        "Mikey": 1619244000000
    },
    "Moreira": {
        "Enzo": 1641625200000
    },
    "Dwelle": {
        "Ethan": 1637737200000
    },
    "Cheresh": {
        "Tumi": 1617084000000
    },
    "Lauper": {
        "Bradley": 1622268000000,
        "Ruby": 1620972000000,
        "Mac": 1620021600000
    },
    "Maddux": {
        "Ben": 1621576800000
    },
    "Van Dyke": {
        "Sorence": 1626069600000
    },
    "Aguilar": {
        "Jacob": 1633759200000
    },
    "Vongprachanh": {
        "Maxwell": 1622008800000
    },
    "Frei": {
        "Keagan": 1642230000000
    },
    "Thorley": {
        "Luke": 1619676000000
    },
    "Salt": {
        "Holland": 1625032800000
    },
    "Bruno": {
        "Christian": 1633154400000
    },
    "Crowley": {
        "Jackson": 1639378800000
    },
    "Bacon": {
        "Kayla": 1622095200000
    },
    "Azad": {
        "Adam": 1626760800000
    },
    "Lebaron": {
        "Jess": 1623477600000
    },
    "Ramakrishnan": {
        "Swagath": 1642575600000
    },
    "Giron": {
        "Mael": 1628661600000
    },
    "Ricker": {
        "Sofia": 1631772000000
    },
    "Renfro": {
        "Amani": 1641538800000
    },
    "Carson": {
        "Sara": 1639810800000
    },
    "Haugen": {
        "Prestley": 1642230000000
    },
    "Tohinaka": {
        "Nova": 1642230000000
    },
    "Haussler": {
        "Luke": 1641884400000
    },
    "Snow": {
        "Atticus": 1642057200000
    },
    "Bywaters": {
        "Verria": 1641798000000
    },
    "Holladay": {
        "Christopher": 1642489200000
    },
    "Hoang": {
        "Airic": 1634364000000
    },
    "Qureshi": {
        "Amer": 1636178400000
    },
    "Said": {
        "Adam": 1642230000000,
        "Ahmed": 1642230000000
    },
    "Carr": {
        "Zane": 1634623200000
    },
    "Merrill-Rhose": {
        "Sterling": 1636178400000
    },
    "Claudio": {
        "Connor": 1638860400000
    },
    "Page": {
        "Wyatt": 1642489200000
    },
    "Olson": {
        "Laela": 1642143600000,
        "Landon": 1642489200000
    },
    "Krueger": {
        "Kolyn": 1642489200000
    },
    "(Kyo) Sienkiewicz": {
        "Kajetan": 1642489200000
    },
    "Christian": {
        "Jack": 1641884400000
    },
    "Cionco": {
        "Kenny": 1642662000000
    },
    "Flores": {
        "Emiliano": 1641625200000
    },
    "Munoz": {
        "Dominic": 1640847600000
    },
    "Lefgren": {
        "Jacob": 1642489200000
    },
    "Bhatti": {
        "Tanyia": 1642402800000
    },
    "Chen": {
        "Ryan": 1642575600000
    },
    "Bailey": {
        "Gage": 1642143600000
    },
    "Paradise": {
        "Landon": 1642489200000
    },
    "Hope": {
        "Madeline": 1642402800000
    },
    "Scott": {
        "Sam": 1642662000000
    }
})
})

Template.home.helpers({
  timeSince(time){
    let d = moment().diff(moment(this.value), 'days')
    if(d > 14){
      return 'Over 2 weeks ago'
    }else if (d > 7){
      return 'Over a week ago'
    }else if(d == 1){
      return 'Submitted Yesterday'
    }else if(d === 0){
      return 'Submitted Today'
    }else{
      return `${d} days ago`
    }
  },
  sinceColor(time){
    let d = moment().diff(moment(this.value), 'days')
    if(d > 14){
      return 'bg-danger text-light'
    }else if (d > 7){
      return 'bg-warning'
    }else{
      return `bg-success text-light`
    }
  }
})



Template.home.events({
  'click #GetTimestamps'(e){
    if($('#D').val() && $('#U').val() && $('#P').val()){
      Session.set('d', $('#D').val())
      Session.set('u', $('#U').val())
      Session.set('p', $('#P').val())
      getTimestamps()
      Session.set('needsLogin', false)
      Session.set('loading', true)
    }
  },
  'keyup #U, keyup #P'(e){
    if(e.keyCode == 13){
      Session.set('d', $('#D').val())
      Session.set('u', $('#U').val())
      Session.set('p', $('#P').val())
      getTimestamps()
      Session.set('needsLogin', false)
      Session.set('loading', true)
    }
  },
  'input #TimestampSearch'(e){
    $('.fam').each((i, a)=>{
      let fam = $(a)
      fam.children('.kid').each((j, b)=>{
        let kid = $(b)
        let visible = e.target.value.trim().toLowerCase().split(' ').some(c=>kid.attr('keys').toLowerCase().includes(c))
        kid.toggleClass('hidden', !visible)
      })
      fam.toggleClass('hidden', fam.find('.kid').toArray().every(b=>$(b).hasClass('hidden')))
    })
  },
  'click #Refresh'(e){
    getTimestamps()
    Session.set('loading', true)
  }
})

function getTimestamps(){
  callWithPromise('fetchStudentTimestamps', Session.get('d'), Session.get('u'), Session.get('p'))
  .then(res=>{
    let names = {}
    Session.set('loading', false)
    testText = res
    res.split('\n').filter(a=>!['  ', '\tPlay & Grade', 'Not Graded'].includes(a)).map(a=>{
      let parts = a.split('\t')
      return {
        fName: parts[0].split(' ')[0],
        lName: parts[0].split(' ').slice(1).join(' '),
        timestamp: parts[3]
      }
    }).forEach(grade=>{
      if(!names[grade.lName]){
        names[grade.lName] = {[grade.fName]:moment(grade.timestamp, 'M/D/YYYY').valueOf()}
      }else if(!names[grade.lName][grade.fName]){
        names[grade.lName][grade.fName] = moment(grade.timestamp, 'M/D/YYYY').valueOf()
      }else if(moment(grade.timestamp, 'M/D/YYYY').isAfter(names[grade.lName][grade.fName])){
        names[grade.lName][grade.fName] = moment(grade.timestamp, 'M/D/YYYY').valueOf()
      }
    })
    Session.set('Grades', names)
  })
  .catch(err=>{
    console.log(err)
    Session.set('loading', false)
    Session.set('needsLogin', true)
    Session.set('loginErrors', err.message)
  })
}

const callWithPromise = (method, ...myParameters)=>new Promise((resolve, reject)=>{
  Meteor.call(method, ...myParameters, (err, res)=>{
    if (err) reject(err)
    resolve(res)
  })
})
