/*repeat infinitely { 
    step 
    if not step then {
       turn right 
       }

}
*/
while (true) {
moved = controller.move();
    if (!moved) {
        controller.rotate();
    }
}
