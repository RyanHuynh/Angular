var app = angular.module('myApp' , ['ngAnimate']);

//Service for retrieving articles
app.service('articleService', function(){
    var articles = [{
                        Title: 'Bacon Ipsum',
                        Content: 'Bacon ipsum dolor amet alcatra turkey strip steak leberkas. Doner shankle salami, ground round turkey short loin capicola hamburger tri-tip. Ground round pork chop t-bone picanha salami, tri-tip pastrami spare ribs tongue chuck pig swine doner. Flank alcatra prosciutto shank brisket venison tri-tip strip steak pastrami meatloaf ribeye. Ham hock leberkas sausage rump. Shank fatback kevin, short ribs ham hock jowl cupim short loin beef boudin pig turducken ground round andouille. Venison pig chicken, bresaola boudin picanha flank brisket porchetta kielbasa sausage frankfurter. Tail shoulder short loin filet mignon biltong meatloaf pork loin. Doner ribeye pork belly chuck shank kielbasa flank, tongue pastrami filet mignon sausage salami. Turducken alcatra chuck, landjaeger pork jerky kielbasa cow meatloaf boudin beef ribs salami. Tenderloin jowl picanha shankle, andouille shank chuck prosciutto turducken swine venison beef ball tip tail brisket. Tenderloin strip steak t-bone bacon leberkas ham hock jowl. Pancetta rump bresaola, prosciutto ham hock ribeye drumstick tri-tip. Prosciutto chuck jowl, spare ribs filet mignon capicola tenderloin andouille pork belly. Cupim strip steak prosciutto, tenderloin leberkas pork ball tip bresaola biltong swine kevin corned beef venison. Beef ribs pork tongue ham hock porchetta bresaola. Porchetta venison ribeye, alcatra kielbasa pig shank bacon pancetta chuck cow pork belly andouille. Biltong doner turducken tenderloin, porchetta tail bacon bresaola shank rump sirloin meatball. Tongue cupim venison kevin, andouille frankfurter bacon prosciutto bresaola doner sirloin. Cow kevin beef ribs shankle swine sausage andouille strip steak cupim chicken. Cow t-bone cupim boudin turkey pork chop. Swine salami corned beef shankle biltong porchetta chicken.'
                    },
                    {
                        Title: 'Tuna Ipsum',
                        Content: 'Sandburrower speckled trout zebra danio tubeblenny ladyfish; whale shark; whitefish eel, "threadsail pigfish Antarctic icefish ray." Ribbon eel.Eeltail catfish frigate mackerel bonefish North American darter, Bengal danio priapumfish saw shark. Staghorn sculpin hamlet zebra lionfish redmouth whalefish half-gill green swordtail bent-tooth beardfish lighthousefish convict cichlid jackfish.Chimaera angelfish horsefish Billfish lemon sole; golden dojo, "Atlantic eel; Sacramento splittail." Deepwater flathead prickleback; sand tilefish; tenpounder flagtail zander.Common tunny kahawai; mullet elasmobranch bala shark eagle ray Blobfish kappy, driftfish Shingle Fish. Southern Dolly Varden pipefish sprat thorny catfish barracudina, armoured catfish featherback deep sea anglerfish. Australian herring rocket danio, flying characin manefish armoured catfish glass knifefish conger eel, dwarf gourami yellowhead jawfish? Tube-eye brown trout, electric ray, trevally ghost carp. Rockfish ladyfish peladillo sawfish, rough pomfret ropefish chain pickerel waryfish leopard danio yellowfin croaker northern Stargazer. European flounder sturgeon pink salmon flyingfish bull trout. Sprat goldfish; spikefish bull shark squeaker stream catfish; Lost River sucker aruana blue catfish lefteye flounder whale shark devil ray salmon shark.Sundaland noodlefish olive flounder horn shark, "fathead sculpin," candlefish bramble shark yellowmargin triggerfish, "staghorn sculpin fathead sculpin trumpetfish: fangtooth eagle ray." Long-finned char orbicular velvetfish, bluegill Bengal danio tarpon; dory; torrent catfish--damselfish, basslet: Atlantic trout barbel trout, moray eel. Black angelfish angelfish wolf-eel. Asiatic glassfish driftfish ribbonfish, three spot gourami South American darter basslet, climbing gourami whiting combtail gourami. Capelin smooth dogfish loweye catfish basslet bigmouth buffalo scaleless black dragonfish murray cod, Rabbitfish stickleback, "pike eel moray eel. Sandburrower speckled trout zebra danio tubeblenny ladyfish; whale shark; whitefish eel, "threadsail pigfish Antarctic icefish ray." Ribbon eel.Eeltail catfish frigate mackerel bonefish North American darter, Bengal danio priapumfish saw shark. Staghorn sculpin hamlet zebra lionfish redmouth whalefish half-gill green swordtail bent-tooth beardfish lighthousefish convict cichlid jackfish.Chimaera angelfish horsefish Billfish lemon sole; golden dojo, "Atlantic eel; Sacramento splittail." Deepwater flathead prickleback; sand tilefish; tenpounder flagtail zander.Common tunny kahawai; mullet elasmobranch bala shark eagle ray Blobfish kappy, driftfish Shingle Fish. Southern Dolly Varden pipefish sprat thorny catfish barracudina, armoured catfish featherback deep sea anglerfish. Australian herring rocket danio, flying characin manefish armoured catfish glass knifefish conger eel, dwarf gourami yellowhead jawfish? Tube-eye brown trout, electric ray, trevally ghost carp. Rockfish ladyfish peladillo sawfish, rough pomfret ropefish chain pickerel waryfish leopard danio yellowfin croaker northern Stargazer. European flounder sturgeon pink salmon flyingfish bull trout. Sprat goldfish; spikefish bull shark squeaker stream catfish; Lost River sucker aruana blue catfish lefteye flounder whale shark devil ray salmon shark.Sundaland noodlefish olive flounder horn shark, "fathead sculpin," candlefish bramble shark yellowmargin triggerfish, "staghorn sculpin fathead sculpin trumpetfish: fangtooth eagle ray." Long-finned char orbicular velvetfish, bluegill Bengal danio tarpon; dory; torrent catfish--damselfish, basslet: Atlantic trout barbel trout, moray eel. Black angelfish angelfish wolf-eel. Asiatic glassfish driftfish ribbonfish, three spot gourami South American darter basslet, climbing gourami whiting combtail gourami. Capelin smooth dogfish loweye catfish basslet bigmouth buffalo scaleless black dragonfish murray cod, Rabbitfish stickleback, "pike eel moray eel."'
                    },
                    {
                        Title: 'Cheese Ipsum',
                        Content: 'Cheese triangles monterey jack smelly cheese. Cut the cheese babybel monterey jack pepper jack manchego cheeseburger cheesecake cheese strings. Parmesan cut the cheese goat airedale cut the cheese gouda gouda camembert de normandie. Cottage cheese cream cheese goat cheesy feet cauliflower cheese fromage frais babybel rubber cheese. Boursin cheese on toast. Red leicester blue castello feta. Halloumi manchego babybel cheese on toast croque monsieur stilton gouda stinking bishop. Fromage frais bocconcini gouda monterey jack cheese and biscuits brie taleggio fondue. Pepper jack taleggio fromage frais cheese slices. Lancashire mascarpone swiss. St. agur blue cheese cheese strings fromage taleggio cheese slices monterey jack taleggio red leicester. Chalk and cheese airedale chalk and cheese parmesan monterey jack queso cream cheese camembert de normandie. Fondue. Bocconcini fromage monterey jack. The big cheese fromage frais babybel pecorino gouda port-salut mozzarella cream cheese. Dolcelatte mozzarella cheese on toast hard cheese port-salut paneer bocconcini macaroni cheese. Taleggio pecorino cheeseburger cheesy feet squirty cheese swiss cauliflower cheese. Melted cheese cut the cheese the big cheese. Manchego pecorino cheeseburger brie fromage frais chalk and cheese brie when the cheese comes out everybodys happy. Stinking bishop fromage feta cheese and biscuits swiss who moved my cheese dolcelatte babybel. Chalk and cheese taleggio. Cheese triangles monterey jack smelly cheese. Cut the cheese babybel monterey jack pepper jack manchego cheeseburger cheesecake cheese strings. Parmesan cut the cheese goat airedale cut the cheese gouda gouda camembert de normandie. Cottage cheese cream cheese goat cheesy feet cauliflower cheese fromage frais babybel rubber cheese. Boursin cheese on toast. Red leicester blue castello feta. Halloumi manchego babybel cheese on toast croque monsieur stilton gouda stinking bishop. Fromage frais bocconcini gouda monterey jack cheese and biscuits brie taleggio fondue. Pepper jack taleggio fromage frais cheese slices. Lancashire mascarpone swiss. St. agur blue cheese cheese strings fromage taleggio cheese slices monterey jack taleggio red leicester. Chalk and cheese airedale chalk and cheese parmesan monterey jack queso cream cheese camembert de normandie. Fondue. Bocconcini fromage monterey jack. The big cheese fromage frais babybel pecorino gouda port-salut mozzarella cream cheese. Dolcelatte mozzarella cheese on toast hard cheese port-salut paneer bocconcini macaroni cheese. Taleggio pecorino cheeseburger cheesy feet squirty cheese swiss cauliflower cheese. Melted cheese cut the cheese the big cheese. Manchego pecorino cheeseburger brie fromage frais chalk and cheese brie when the cheese comes out everybodys happy. Stinking bishop fromage feta cheese and biscuits swiss who moved my cheese dolcelatte babybel. Chalk and cheese taleggio.'
                    },
                    {
                        Title: 'Zombie Ipsum',
                        Content: 'Zombie ipsum brains reversus ab cerebellum viral inferno, brein nam rick mend grimes malum cerveau cerebro. De carne cerebro lumbering animata cervello corpora quaeritis. Summus thalamus brains sit​​, morbo basal ganglia vel maleficia? De braaaiiiins apocalypsi gorger omero prefrontal cortex undead survivor fornix dictum mauris. Hi brains mindless mortuis limbic cortex soulless creaturas optic nerve, imo evil braaiinns stalking monstra hypothalamus adventus resi hippocampus dentevil vultus brain comedat cerebella pitiutary gland viventium. Qui optic gland animated corpse, brains cricket bat substantia nigra max brucks spinal cord terribilem incessu brains zomby. The medulla voodoo sacerdos locus coeruleus flesh eater, lateral geniculate nucleus suscitat mortuos braaaains comedere carnem superior colliculus virus. Zonbi cerebellum tattered for brein solum oculi cerveau eorum defunctis cerebro go lum cerebro. Nescio brains an Undead cervello zombies. Sicut thalamus malus putrid brains voodoo horror. Nigh basal ganglia tofth eliv ingdead.'
                    }];
    
    this.getArticles = function(){
        return articles;
    }
});

//Main controller of our app.
app.controller('myCtrl', function($location, $scope, $anchorScroll, articleService, anchorSmoothScroll){
  

    $scope.articles = articleService.getArticles();
    $scope.chapterNo = 'Chapter 1';
    $scope.chapterName = $scope.articles[0].Title;

    $scope.gotoChapter = function(chapter, $event){
        
    };
  
});

//Directive to display main content
app.directive('mainContent', function(){
    var temp = "<div id='chpt{{ $index + 1}}'' ng-repeat='article in articleList'>" +
                    "<h1>Chapter {{ $index + 1 }}: {{ article.Title }} </h1>" +
                        "<p>{{ article.Content }}</p>" +
                "</div>";  
    return {
        restrict: 'A',
        scope: {
            articleList : '=input'
        },
        template: temp
    }
});

app.directive('tableContent', function(){
    var temp =  "<ul>" +
                    "<li><h3>Table of contents: </h3></li>" +
                    "<li ng-repeat='article in articles' table-content-item><li>" +
                "</ul>";
    return {
        template : temp
    }
});

app.directive('tableContentItem', function($location, anchorSmoothScroll){
    return {
        template: "Chapter {{ $index + 1 }}: {{ article.Title }}",
        link: function($scope,element, attrs){
            element.bind('click', function(){
                var chapter = 'chpt' + ($scope.$index + 1);
                element.parent().children().css('color', 'black');
                element.css('color', 'blue');
                $location.hash(chapter);
                anchorSmoothScroll.scrollTo(chapter); 
            });
        }
    };
});

//Smooth Scroll Service
app.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID) - 35;  //Readjust
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }
    };
});
