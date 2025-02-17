import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { doc, getDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { query, serverTimestamp, orderBy, where } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyAI42qhiPOLUA-9wtpw-G7PuESx5ENi91Y",
  authDomain: "designs-platform-v2.firebaseapp.com",
  projectId: "designs-platform-v2",
  storageBucket: "designs-platform-v2.appspot.com",
  messagingSenderId: "88726569119",
  appId: "1:88726569119:web:e4db1c46a1fad6db9b22aa",
};

initializeApp(firebaseConfig);

const database = getFirestore();
const storage = getStorage();

// ==================== Designs Collection ====================
const nichesCol = collection(database, "niches");
const designsCol = collection(database, "designs");
const commentsCol = collection(database, "comments");

//==================== Fetch All Niches ====================
export function fetchNiches(setNiches) {
  const nichesQuery = query(nichesCol, orderBy("timestamp", "desc"));
  onSnapshot(nichesQuery, (snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data = [...data, { ...doc.data(), id: doc.id }];
    });
    setNiches(data);
  });
}

// ==================== Fetch Single Niche ====================
export function fetchSingleNiche(id, setNiche) {
  const nicheRef = doc(database, "niches", id);
  getDoc(nicheRef).then((doc) => {
    setNiche({ ...doc.data(), id: doc.id });
  });
}

// ==================== Fetch All Designs ====================
export function fetchDesigns(setDesigns) {
  const designsQuery = query(designsCol);
  onSnapshot(designsQuery, (snapshot) => {
    let designs = [];
    snapshot.docs.forEach((doc) => {
      designs = [...designs, { ...doc.data(), id: doc.id }];
    });
    setDesigns(designs);
  });
}

// ==================== Fetch Single Niche Designs ====================
export function fetchNicheDesings(id, setNicheDesigns) {
  const designsQuery = query(designsCol, where("nicheId", "==", id));
  onSnapshot(designsQuery, (snapshot) => {
    let nicheDesigns = [];
    snapshot.docs.forEach((doc) => {
      nicheDesigns = [...nicheDesigns, { ...doc.data(), id: doc.id }];
    });
    setNicheDesigns(nicheDesigns);
  });
}

// ==================== Add Niche ====================
export function addNiche(e) {
  e.preventDefault();
  addDoc(nichesCol, {
    name: e.target.niche.value.toLowerCase().trim(),
    createdAt: new Date().toLocaleDateString(),
    timestamp: serverTimestamp(),
  })
    .then(() => {
      e.target.reset();
      alert("Niche Added Successfully");
    })
    .catch((err) => alert(err.message));
}

// ==================== Add Niche Designs ====================
export function addNicheDesigns(e, niche) {
  e.preventDefault();
  const imageFiles = e.target.design_image;
  function uploadHandler(file) {
    if (file.files.length > 0) {
      const imageFile = file.files[0];
      const uuidImageName = imageFile.name + v4();
      const imageRef = ref(storage, `designs-images/${uuidImageName}`);
      const uploadTask = uploadBytesResumable(imageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => alert(err.message),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            addDoc(designsCol, {
              nicheId: niche.id,
              name: niche.name,
              image: url,
              image_name: uuidImageName,
              status: "pending",
              createdAt: new Date().toLocaleDateString(),
              timestamp: serverTimestamp(),
            });
          });
        }
      );
    }
  }
  if (imageFiles.length > 0) {
    imageFiles.forEach((file) => {
      uploadHandler(file);
    });
  } else {
    uploadHandler(imageFiles);
  }
}

// ==================== Delete Niche ====================
export function deleteNiche(id) {
  const conf = window.confirm("Are you sure you want to delete this design?");
  if (conf) {
    const nicheRef = doc(database, "niches", id);
    let nicheDesigns = [];
    // Get Niche Designs
    const designsQuery = query(designsCol, where("nicheId", "==", id));
    onSnapshot(designsQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        nicheDesigns = [...nicheDesigns, { ...doc.data(), id: doc.id }];
      });
      // Start Deleting Niche Designs
      nicheDesigns.forEach((design) => {
        // Get Design Comments
        const commentsQuery = query(
          commentsCol,
          where("designId", "==", design.id)
        );
        let comments = [];
        onSnapshot(commentsQuery, (snapshot) => {
          let docs = [];
          snapshot.docs.map((doc) => {
            docs = [...docs, { ...doc.data(), id: doc.id }];
          });
          comments = docs;
        });
        // Delete Images from Storage
        const imageRef = ref(storage, `designs-images/${design.image_name}`);
        deleteObject(imageRef)
          .then(() => {
            const designRef = doc(database, "designs", design.id);
            deleteDoc(designRef)
              .then(() => {
                // Delete Comments
                comments.forEach((comment) => {
                  deleteComment(comment.id);
                });
              })
              .catch((err) => alert(err.message));
          })
          .catch((err) => console.log(err.message));
      });
    });
    deleteDoc(nicheRef).then(() => alert("Design Deleted Successfully"));
  }
}

// ==================== Delete Design ====================
export function deleteDesign(design) {
  const conf = window.confirm("Are you sure you want to delete this design?");
  if (conf) {
    const imageRef = ref(storage, `designs-images/${design.image_name}`);

    const commentsQuery = query(
      commentsCol,
      where("designId", "==", design.id)
    );
    let comments = [];
    onSnapshot(commentsQuery, (snapshot) => {
      let docs = [];
      snapshot.docs.map((doc) => {
        docs = [...docs, { ...doc.data(), id: doc.id }];
      });
      comments = docs;
    });

    deleteObject(imageRef)
      .then(() => {
        const designRef = doc(database, "designs", design.id);
        deleteDoc(designRef).then(() => alert("Design Deleted Successfully"));
        comments.forEach((comment) => {
          deleteComment(comment.id);
        });
      })
      .catch((err) => console.log(err.message));
  }
}

// ==================== Update Design ====================
export function updateDesign(design, file) {
  if (file.files.length > 0) {
    const imageFile = file.files[0];
    const uuidImageName = imageFile.name + v4();
    const imageRef = ref(storage, `designs-images/${uuidImageName}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => alert(err.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const designRef = doc(database, "designs", design.id);
          updateDoc(designRef, {
            image: url,
            image_name: uuidImageName,
          }).then(() => {
            const imageRef = ref(
              storage,
              `designs-images/${design.image_name}`
            );
            deleteObject(imageRef)
              .then(() => {})
              .catch((err) => console.log(err.message));
          });
        });
      }
    );
  }
}

// ==================== Search Niche ====================
export function searchNiche(nicheName, setNiche) {
  const q = query(
    nichesCol,
    where("name", "==", nicheName.toLowerCase()),
    orderBy("timestamp", "desc")
  );
  onSnapshot(q, (snapshot) => {
    let docs = [];
    snapshot.docs.map((doc) => {
      docs = [...docs, { ...doc.data(), id: doc.id }];
    });
    setNiche(docs);
  });
}

// ==================== Design Situation Updater ====================

export function designSituationAction(id, status) {
  const designRef = doc(database, "designs", id);
  const design = getDoc(designRef);
  design.then((doc) => {
    const docStatus = doc.data().status;
    if (docStatus !== status) {
      updateDoc(designRef, {
        status: status,
      })
        .then(() => {})
        .catch((err) => alert(err.message));
    }
  });
}

// ==================== Add Design Comment ====================
export function addDesignComment(e, designId) {
  e.preventDefault();
  if (e.target.comment.value !== "") {
    addDoc(commentsCol, {
      comment: e.target.comment.value,
      designId,
      createdAt: new Date().toLocaleDateString(),
      timestamp: serverTimestamp(),
    })
      .then(() => {
        e.target.reset();
      })
      .catch((err) => alert(err));
  } else {
    alert("Add Comment!");
  }
}

// ==================== Fetch Design Comment ====================
export function fetchDesignComments(designId, setDesignComment) {
  const q = query(
    commentsCol,
    where("designId", "==", designId),
    orderBy("timestamp", "desc")
  );
  onSnapshot(q, (snapshot) => {
    let docs = [];
    snapshot.docs.map((doc) => {
      docs = [...docs, { ...doc.data(), id: doc.id }];
    });
    setDesignComment(docs);
  });
}

// ==================== Delete Comment ====================
export function deleteComment(id) {
  const commentRef = doc(database, "comments", id);
  deleteDoc(commentRef)
    .then(() => {})
    .catch((err) => alert(err.message));
}
