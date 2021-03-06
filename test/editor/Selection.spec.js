import { editor } from "../../src/editor/editor";
import { ArtBoard } from "../../src/editor/items/ArtBoard";
import { Project } from "../../src/editor/items/Project";
import { Layer } from "../../src/editor/items/Layer";
import { URLImageResource } from "../../src/editor/image-resource/URLImageResource";
import { BackgroundImage } from "../../src/editor/css-property/BackgroundImage";


var project, artboard;
beforeEach(() => {
    editor.clear()
    project = editor.addProject(new Project({ name: 'Sample Project'}));
    artboard = project.add(new ArtBoard({ name: 'Sample Project'}));
})

afterEach( () => {
    editor.clear()
})

test('Selection - select a layer', () => {
    var layer = artboard.add(new Layer());
    
    layer.select()

    expect(this.$selection.items.length).toEqual(1);
});

test('Selection - select many layers', () => {

    var layers = [...Array(10)].map(_ => {
        return artboard.add(new Layer());    
    }) 
    
    this.$selection.select(...layers);

    expect(this.$selection.items.length).toEqual(10);
    expect(this.$selection.ids.length).toEqual(10);
});

test('Selection - change selection mode', () => {
    this.$selection.mode = 'layer';
    
    expect(this.$selection.mode).toEqual('layer');
})

test('Selection - select image resource', () => {
    var layer = artboard.add(new Layer())
    var backgroundImage = layer.addBackgroundImage(new BackgroundImage())
    var image = backgroundImage.addImageResource(new URLImageResource({ url: 'yellow' }));
    image.select()

    var currentImage = this.$selection.image; 
    expect(!!currentImage).toEqual(true);

    expect(currentImage.url).toEqual('yellow');
})