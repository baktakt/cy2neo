function Neo(url) {
	var me = {
        getData: function(cb) {
            axios.get(url)
            .then(function (response) {
                data = response.data;
                if (data.errors.length > 0) {
						cb(data.errors);
					} else {
						var cols = data.results[0].columns;
						var rows;
						var nodes = [];
						var rels = [];
						var labels = [];
					    function findNode(nodes, id) {
						   for (var i=0;i<nodes.length;i++) {
						      if (nodes[i].id == id) return i;
						   }
						   return -1;
					    }
						data.results[0].data.forEach(function(row) {
							row.graph.nodes.forEach(function(n) {
							   var found = nodes.filter(function (m) { return m.id == n.id; }).length > 0;
							   if (!found) {
								  //n.props=n.properties;
								  for(var p in n.properties||{}) { n[p]=n.properties[p];delete n.properties[p];} 
								  delete n.properties;
								  nodes.push(n);
								  labels=labels.concat(n.labels.filter(function(l) { labels.indexOf(l) == -1 }))
							   }
							});
							rels = rels.concat(row.graph.relationships.map(
								function(r) { 
								   return { id: r.id, start:r.startNode, end:r.endNode, type:r.type } }
								));
						});
						cb(null,{table:rows,graph:{nodes:nodes, links:rels},labels:labels});
					}
            })
            .catch(function (error) {
                console.log(error);
            });
        }
	};
	return me;
}
