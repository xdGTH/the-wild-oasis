import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      {/* //We can have multiple windows inside the same modal component. And the
      Open property should know which window is open */}
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.Open opens="table">
        <Button>Get cabin table</Button>
        </Modal.Open>
        <Modal.Window name="table">
        <CabinTable />
        </Modal.Window> */}
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIssOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIssOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onCloseModal={() => setIssOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIssOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
