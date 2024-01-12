import React, { useState, useEffect, useRef } from 'react';
import { Line, BufferGeometry,Vector3, LineBasicMaterial, Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import './Landing.css';
const Landing = () => { 
    
    const refContainer = useRef(null);

    useEffect(() => { 
        let scene, camera, renderer, cube;

        scene = new Scene();

        camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //field of view, aspect radio, view frustum,

        //render graphics -> need to know which element to use
        renderer = new WebGLRenderer();
        // renderer.setSize(window.innerWidth, window.innerHeight);
                // renderer.setSize(refContainer.current.clientWidth, refContainer.current.clientHeight); // Set the size based on the container div
        renderer.setSize(window.innerWidth, window.innerHeight);


        refContainer.current && refContainer.current.appendChild(renderer.domElement);
        let geometry = new BoxGeometry(1, 1, 1);
        let material = new MeshBasicMaterial( { color: 0x00ff00 } );
        cube = new Mesh( geometry, material );
        scene.add(cube);
        
        material = new LineBasicMaterial( { color: 0x0000ff } );
        const points = [];
    points.push(new Vector3(-2, 0, 0)); // Adjusted the x-coordinate for better visibility
    points.push(new Vector3(0, 2, 0));
    points.push(new Vector3(2, 0, 0));

        geometry = new BufferGeometry().setFromPoints( points );
        const line = new Line( geometry, material );
        scene.add( line );

        camera.position.z = 5;
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
        
    }, []);

    return (
        <div className="sds" ref={refContainer}></div>
    );
}

export default Landing;