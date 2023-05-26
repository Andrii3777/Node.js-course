const csvText =
    `44.38,34.33,Alushta,28455,
#49.46,30.17,Bila Tserkva,207808,
50.45,30.52,Vinnytsia,370251,
#49.34,25.35,Lutsk,217628,

46.59,31.59,Lviv,757273,
49.50,24.02,#Ternopil,222414,

48.54,24.41,Ivano-Frankivsk,237083,
48.28,#35.02,Dnipro,1032822,
46.29,30.44,Odessa,1014872,
49.25,27.06,Zhytomyr,#280707,
50.26,30.31,Kyiv,2953972,
48.38,39.22,Kharkiv,1430885,
46.58,32.00,Mykolaiv,494921,#...
#50.07,30.31,Brovary,104729,
#48.56,24.46,Kolomyia,60869,

50.06,36.14,Donetsk,1016194,
47.53,35.23,Zaporizhzhia,733042,
48.53,24.43,Kalush,#64630,
48.43,30.10,Cherkasy,284933,
50.43,32.30,Sumy,269628,
49.14,28.25,Kropyvnytskyi,236630,`;

console.log(populationTop(csvText)("Kyiv, Odessa and Sumy."));