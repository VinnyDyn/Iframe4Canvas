import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { runInThisContext } from "vm";

export class Iframe4Canvas implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container : HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _iframe : HTMLIFrameElement;

	private _src : string;
	private _width : number;
	private _heigth : number;

	/**
	 * Empty constructor.
	 */
	constructor()
	{
	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._container = container;
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this._context = context;
		if(this.refreshIsNecessary())
		{
			this.updateParameters();
			this.clear();
			this.render();
		}
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

	private refreshIsNecessary() : boolean
	{
		if(this._src != this._context.parameters.src.raw! || this._heigth != this._context.parameters.height.raw! || this._width != this._context.parameters.width.raw!)
			return true;
		else
			return false;
	}

	private updateParameters() : void
	{
		this._src = this._context.parameters.src.raw!;
		this._heigth = this._context.parameters.height.raw!;
		this._width = this._context.parameters.width.raw!;
	}

	public render()
	{
		let uri = this._src ? this._src : "http://blanks";

		this._iframe = document.createElement("iframe");
		this._iframe.id = "iframe_4_canvas";
		this._iframe.style.minHeight = "200px";
		this._iframe.style.minWidth = "200px";
		this._iframe.height = this._heigth.toString() + "px";
		this._iframe.width = this._width.toString() + "px";
		this._iframe.setAttribute("src", uri);
		this._container.appendChild(this._iframe);
	}

	public clear()
	{
		while (this._container.lastChild) {
			this._container.removeChild(this._container.lastChild);
		}
	}
}