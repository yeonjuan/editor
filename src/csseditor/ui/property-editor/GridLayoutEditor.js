import UIElement, { EVENT } from "../../../util/UIElement";
import { LOAD, CLICK } from "../../../util/Event";
import { CSS_TO_STRING, STRING_TO_CSS } from "../../../util/functions/func";
import SelectIconEditor from "./SelectIconEditor";
import { editor } from "../../../editor/editor";
import GridBoxEditor from "./GridBoxEditor";
import icon from "../icon/icon";

const i18n = editor.initI18n('grid.layout.editor')

export default class GridLayoutEditor extends UIElement {

    components() {
        return {
            SelectIconEditor,
            GridBoxEditor,

        }
    }

    initState() {
        return {
            ...STRING_TO_CSS(this.props.value),
        }
    }

    setValue (value) {
        this.setState({
            ...STRING_TO_CSS(value),
        })
    }

    getValue () {
        return CSS_TO_STRING(this.state)
    }

    modifyData() {
        this.parent.trigger(this.props.onchange, this.props.key, this.getValue())
    }

    [LOAD('$body')] () {
        return /*html*/`


            <div class='grid-layout-item'>
                <div class='label'>
                    <label>${i18n('template.columns')}</label> 
                    <span class='tools'>
                        <button type='button' ref='$addColumn'>${icon.add}</button>
                    </span>
                </div>
                <GridBoxEditor 
                    ref='$columnBox'
                    key='grid-template-columns'
                    value="${this.state['grid-template-columns'] || ''}"
                    onchange='changeKeyValue'
                />
            </div>
            <div class='grid-layout-item'>
                <div class='label'><label>${i18n('column.gap')}</label></div>
                <GridGapEditor 
                    key='grid-column-gap'
                    value="${this.state['grid-column-gap'] || ''}"
                    onchange='changeKeyValue'
                />
            </div>            
            <div class='grid-layout-item'>
                <div class='label'>
                    <label>${i18n('template.rows')}</label>
                    <span class='tools'>
                        <button type='button' ref='$addRow'>${icon.add}</button>
                    </span>
                </div>
                <GridBoxEditor 
                    ref='$rowBox'
                    key='grid-template-rows'
                    value="${this.state['grid-template-rows'] || ''}"
                    onchange='changeKeyValue'
                />
            </div>            
            <div class='grid-layout-item'>
                <div class='label'><label>${i18n('row.gap')}</label></div>
                <GridGapEditor 
                    key='grid-row-gap'
                    value="${this.state['grid-row-gap'] || ''}"
                    onchange='changeKeyValue'
                />
            </div>
        `
    }

    [CLICK('$addColumn')] () {
        this.children.$columnBox.trigger('add');
    }

    [CLICK('$addRow')] () {
        this.children.$rowBox.trigger('add');
    }    

    template () {
        return /*html*/`
            <div class='grid-layout-editor' ref='$body' ></div>
        `
    }


    [EVENT('changeKeyValue')] (key, value, params) {

        this.setState({
            [key]: value
        }, false)

        this.modifyData();
    }
}