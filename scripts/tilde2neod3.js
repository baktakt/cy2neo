function Tilde2NeoD3(config, graphId, url, renderGraph, cbResult) {
    var neod3 = new Neod3Renderer();
	var neo = new Neo(url);
	
    try {
        var query = "";
        neo.getData(function(err,res) {
            res = res || {}
            var graph=res.graph;
            if (renderGraph) {
                if (graph) {
                    var c=$("#"+graphId);
                    c.empty();
                    neod3.render(graphId, c ,graph);
                } else {
                    if (err) {
                        console.log(err);
                    }
                }
            }
            if(cbResult) cbResult(res);
        });
    } catch(e) {
        console.log(e);
    }
}
