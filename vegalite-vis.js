// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {

  const vlSpec = vl
    // .markBar()
    // .data(data)
    // .encode(
    //   vl.y().fieldN("Platform").sort("-x"),
    //   vl.x().fieldQ("Global_Sales").aggregate("sum")
    // )
    // .width("container")
    // .height(400)
    // .toSpec();

    // VISUALISATION 1
    .markBar()
    .data(data)
      .encode(
    //mapping platform data to x, y axis
    vl.x().field("Platform").type("nominal"),
    vl.y().aggregate("sum").field("Global_Sales").type("quantitative").title("Global Sales (millions)"),
    vl.color().fieldN("Genre").title("Genre"),
    vl.tooltip(["Platform", "Genre", "Global_Sales"])
  )
  .width(800)
  .height(500)
//   .render()
  .toSpec();

    
 
  const vlSpec2 = vl
    // .markBar()
    // .data(data)
    // .encode(
    //   vl.y().fieldN("Genre").sort("-x"),
    //   vl.x().fieldQ("Global_Sales").aggregate("sum"),
    //   vl.color().value("teal")
    // )
    // .width("container")
    // .height(400)
    // .toSpec();
    
    //VISUALISATION 2
  .markLine({point: true})
  .data(data)
  .transform(
    vl.calculate("toNumber(datum.Year)").as("YearNum")
  )
  .encode(
    //x axis: time (year)
    //y axis: sales, platform and genre
    vl.x().fieldQ("YearNum").title("Year"),
    vl.y().aggregate("sum").fieldQ("Global_Sales").title("Total Sales (millions)"),
    vl.color().fieldN("Platform"), //nominal data
    vl.detail().fieldN("Genre"),   //nominal data
    vl.tooltip(["Year", "Platform", "Genre", "Global_Sales"])
  )
  .width(800)
  .height(500)
  .toSpec();

    // VISUALIZATION 3
  const vlSpec3 = vl
    .markBar()
    .data(data)
    .transform(
      vl.fold(["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"])
        .as(["Region", "Sales"])
    )
    .encode(
      vl.x().fieldN("Platform").title("Platform"),
      vl.y().aggregate("sum").fieldQ("Sales").title("Total Sales (millions)"),
      vl.color().fieldN("Region").title("Region"),
      vl.tooltip(["Platform", "Region", "Sales"])
    )
    .width(800)
    .height(500)
    .title("Regional Sales by Platform")
    .toSpec();


  // VISUALIZATION 4
  const vlSpec4 = vl
    .markBar()
    .data(data)
    .encode(
      vl.x().aggregate("sum").fieldQ("JP_Sales").title("Total Sales in Japan (millions)"),
      vl.y().fieldN("Genre").sort("-x").title("Genre"),
      vl.color().fieldN("Genre").legend(null),
      vl.tooltip(["Genre", "JP_Sales"])
    )
    .width(700)
    .height(400)
    .title("Best-Selling Video Game Genres in Japan")
    .toSpec();


  render("#view", vlSpec);
  render("#view2", vlSpec2);
  render("#view3", vlSpec3);
  render("#view4", vlSpec4);
}

);

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
