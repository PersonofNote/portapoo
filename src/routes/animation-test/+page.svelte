<script>
    export let data;
    import { Motion, useMotionValue, useTransform } from 'svelte-motion'
    let panoffset = 0;
    const onPanStart = () => (console.log("PANNING"));
    // called onPan:
    const setY = (e, info) => {
        console.log("SETTING")
        console.log(info)
        const offset = info.offset.y;
        const yy = Math.sign(offset) * Math.pow(Math.abs(offset), 1.1);
        y.set(yy + panoffset);
    };

    // called on panEnd
    const clampToClosest = (e,info) => {
        const target = Math.round((y.get() + info.velocity.y ) / height);
        // selectedIndex needs to change
        selectedIndex = -target + 1;
        selectedIndex = -target;
        selected = visibleLabels(selectedIndex)[1].label;
    };
    const x = useMotionValue(0);

    
    const y = useMotionValue(0); // Initialize y position with 0

    const handleDrag = (event, info) => {
        console.log("HANDLING")
        setY(event, info)
        console.log(y)
        //y.set(info.point.y); // Update y value with the new position during dragging
        //console.log(info.point)
    };
    const dragEnd = (event, info) => {
        console.log("HANDLING")
        y.set(info.point.y); // Update y value with the new position during dragging
    };

    let area;
    /* Height stuff */
    const minHeight = 50; // Define a minimum height
    const maxHeight = 200; // Define a maximum height
    const normalizedY = (y.get() - y.min) / (y.max - y.min); // Normalize y value between 0 and 1
    const calculatedHeight = minHeight + normalizedY * (maxHeight - minHeight);
  </script>
<main>
    <div class="container">
        <Motion >
            <h1 drag>Interactions Test Page</h1>
        </Motion>
        <div class="drag-container" bind:this={area}/>
            <Motion
                drag="y"
                dragConstraints={{current:area}}
                dragTransition={{ velocity: 0}}
                style={{ y, height: calculatedHeight  }}
                let:motion={drag}>
                    <div class="handle" use:drag/>
                    <div class="content" use:drag  >
                        <p> </p>
                    </div>
            </Motion>
        </div>
</main>

<style>
  main {
    height: 100vh;
    overflow: hidden;
  }
  .square {
    background-color: blue;
    height: 50px;
    width: 50px;
  }
 .drag-container {
    margin: 2rem;
    height: 400px;
    width: 200px;
    border: 1px solid gray;
    overflow: hidden;
 }
  .container {
    margin: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    touch-action: none;
  }
  .handle {
    height: 32px;
    width: 200px;
    background-color: blue;
  }
  .content {
    background-color: lightblue;
    width: 200px;
    overflow: hidden;
  }
</style>