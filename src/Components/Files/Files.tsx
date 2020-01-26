import React, { useEffect } from "react";

// ESTILOS
import "./Files.css";

// COPIAR TEXTO
import copy from 'copy-to-clipboard';

// LIMITAR SHARE API
let shareCount: number = 0;

// PROPIEDADES
interface Props { data: Idata[], appName: string; shareText: string; showToast: Function; }

const File: React.FC<Props> = (props: Props) => {
	// FUNCION DE COMPARTIR
	const shareAction = (e: any) => {
		if (navigator.share && shareCount === 0) {
			navigator
				.share({
					title: props.appName,
					text: props.shareText,
					url: e.target?.getAttribute("data-link")
				})
				.then(() => console.log("Successfully share"))
				.catch((error: Error) => console.log("Error sharing", error));
		} else {
			copy(e.target?.getAttribute("data-link"))
			props.showToast();
		}
	}

	useEffect(() => {
		// SELECCIONAR VIEWPORT Y BOTONES DE ABRIR Y CERRAR
		const vp: HTMLMetaElement | null = document.getElementById("viewport") as HTMLMetaElement;
		const visibilityBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".showPrev");
		const closePrevBtn: NodeListOf<HTMLLabelElement> = document.querySelectorAll(".closePrev");

		// HABILITAR ZOOM EN VISTA PREVIA
		if (visibilityBtn && closePrevBtn) {
			visibilityBtn.forEach((el: HTMLButtonElement) => {
				el.addEventListener("click", () => vp?.setAttribute("content", "width=device-width, initial-scale=1"))
			})
			closePrevBtn.forEach((el: HTMLLabelElement) => {
				el.addEventListener("click", () => vp?.setAttribute("content", "width=device-width, initial-scale=1, user-scalable=no"))
			})
		}
	})

	return (
		<>
			<div id="filecontainer">
				{
					props.data.map((e: Idata, i: number) => {
						return (
							<div key={i} className="file">
								<input id={`showPreview${i}`} className="prevBtn" type="checkbox"></input>
								<div className="fileHead">
									<h1>{e.title}</h1>
									<p>{e.text[0]?.toUpperCase() + e.text.substr(1)}</p>
								</div>
								<div className="fileMiddle">
									<ul>
										<li>
											<i>Subido:</i>
											<span>{e.upload}</span>
										</li>
										<li>
											<i>Curso:</i>
											<span>{e.course}</span>
										</li>
										<li>
											<i>Tipo:</i>
											<span>{e.type}</span>
										</li>
									</ul>
								</div>
								<div className="fileBody">
									<div className="actions">
										<button className="waves waves-dark action showPrev"><label htmlFor={`showPreview${i}`} className="material-icons">visibility</label></button>
										<button onClick={shareAction} data-link={e.link} className="waves waves-dark action"><i data-link={e.link} className="material-icons">share</i></button>
									</div>
									<a className="waves waves-dark" href={e.link} title={e.title} download><i className="material-icons">arrow_downward</i> Descargar</a>
								</div>
								<div className="preview">
									<label htmlFor={`showPreview${i}`} className="material-icons closePrev waves waves-dark">close</label>
									<iframe width="100%" height="100%" title={e.title} src={`https://docs.google.com/gview?embedded=true&url=${e.link}`} />
								</div>
							</div>
						)
					})
				}
			</div>
		</>
	)
}

export default File;