import React, { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import {
  SignIn,
  SignUp,
  UserButton,
  useAuth,
} from "@clerk/react";

import "./App.css";
import Feedback from "./Feedback";
import About from "./About";

/* =====================================================
   INHERITANCE DATA
===================================================== */

const inheritanceData = {
  Single: {
    description:
      "One derived class inherits properties and behaviors from one base class.",

    diagram: [
      {
        id: "A",
        label: "Base Class",
        sub: "Animal",
        x: 50,
        y: 18,
      },
      {
        id: "B",
        label: "Derived Class",
        sub: "Dog",
        x: 50,
        y: 78,
      },
    ],

    arrows: [["A", "B"]],

    code: `#include <iostream>
using namespace std;

class Animal {
public:
    void eat() {
        cout << "Animal eats" << endl;
    }
};

class Dog : public Animal {
public:
    void bark() {
        cout << "Dog barks" << endl;
    }
};

int main() {
    Dog d;

    d.eat();
    d.bark();

    return 0;
}`,

    output: [
      "Animal eats",
      "Dog barks",
    ],
  },

  Multilevel: {
    description:
      "A derived class becomes the base class for another derived class.",

    diagram: [
      {
        id: "A",
        label: "Base Class",
        sub: "A",
        x: 50,
        y: 10,
      },
      {
        id: "B",
        label: "Intermediate",
        sub: "B",
        x: 50,
        y: 50,
      },
      {
        id: "C",
        label: "Derived Class",
        sub: "C",
        x: 50,
        y: 90,
      },
    ],

    arrows: [
      ["A", "B"],
      ["B", "C"],
    ],

    code: `#include <iostream>
using namespace std;

class A {
public:
    void showA() {
        cout << "Class A" << endl;
    }
};

class B : public A {
public:
    void showB() {
        cout << "Class B" << endl;
    }
};

class C : public B {
public:
    void showC() {
        cout << "Class C" << endl;
    }
};

int main() {
    C obj;

    obj.showA();
    obj.showB();
    obj.showC();

    return 0;
}`,

    output: [
      "Class A",
      "Class B",
      "Class C",
    ],
  },

  Multiple: {
    description:
      "One derived class inherits from two or more base classes.",

    diagram: [
      {
        id: "A",
        label: "Base Class",
        sub: "A",
        x: 25,
        y: 15,
      },
      {
        id: "B",
        label: "Base Class",
        sub: "B",
        x: 75,
        y: 15,
      },
      {
        id: "C",
        label: "Derived Class",
        sub: "C",
        x: 50,
        y: 80,
      },
    ],

    arrows: [
      ["A", "C"],
      ["B", "C"],
    ],

    code: `#include <iostream>
using namespace std;

class A {
public:
    void showA() {
        cout << "A" << endl;
    }
};

class B {
public:
    void showB() {
        cout << "B" << endl;
    }
};

class C : public A, public B {
public:
    void showC() {
        cout << "C" << endl;
    }
};

int main() {
    C obj;

    obj.showA();
    obj.showB();
    obj.showC();

    return 0;
}`,

    output: [
      "A",
      "B",
      "C",
    ],
  },

  Hierarchical: {
    description:
      "Multiple derived classes inherit from the same base class.",

    diagram: [
      {
        id: "A",
        label: "Base Class",
        sub: "Animal",
        x: 50,
        y: 15,
      },
      {
        id: "B",
        label: "Derived Class",
        sub: "Dog",
        x: 25,
        y: 80,
      },
      {
        id: "C",
        label: "Derived Class",
        sub: "Cat",
        x: 75,
        y: 80,
      },
    ],

    arrows: [
      ["A", "B"],
      ["A", "C"],
    ],

    code: `#include <iostream>
using namespace std;

class Animal {
public:
    void eat() {
        cout << "Animal eats" << endl;
    }
};

class Dog : public Animal {
public:
    void bark() {
        cout << "Dog barks" << endl;
    }
};

class Cat : public Animal {
public:
    void meow() {
        cout << "Cat meows" << endl;
    }
};

int main() {
    Dog d;
    Cat c;

    d.eat();
    d.bark();

    c.eat();
    c.meow();

    return 0;
}`,

    output: [
      "Animal eats",
      "Dog barks",
      "Animal eats",
      "Cat meows",
    ],
  },

  Hybrid: {
    description:
      "Hybrid inheritance combines two or more types of inheritance.",

    diagram: [
      {
        id: "A",
        label: "Base Class",
        sub: "A",
        x: 50,
        y: 8,
      },
      {
        id: "B",
        label: "Derived Class",
        sub: "B",
        x: 25,
        y: 45,
      },
      {
        id: "C",
        label: "Derived Class",
        sub: "C",
        x: 75,
        y: 45,
      },
      {
        id: "D",
        label: "Final Class",
        sub: "D",
        x: 50,
        y: 88,
      },
    ],

    arrows: [
      ["A", "B"],
      ["A", "C"],
      ["B", "D"],
      ["C", "D"],
    ],

    code: `#include <iostream>
using namespace std;

class A {
public:
    void showA() {
        cout << "Class A" << endl;
    }
};

class B : virtual public A {
public:
    void showB() {
        cout << "Class B" << endl;
    }
};

class C : virtual public A {
public:
    void showC() {
        cout << "Class C" << endl;
    }
};

class D : public B, public C {
public:
    void showD() {
        cout << "Class D" << endl;
    }
};

int main() {
    D obj;

    obj.showA();
    obj.showB();
    obj.showC();
    obj.showD();

    return 0;
}`,

    output: [
      "Class A",
      "Class B",
      "Class C",
      "Class D",
    ],
  },
};

/* =====================================================
   ACCESS DATA
===================================================== */

const accessData = {
  public: {
    title: "Public Inheritance",

    description:
      "Public inheritance keeps public members public and protected members protected in the derived class.",

    example: "class Dog : public Animal",

    visibility: [
      ["Base public", "Public"],
      ["Base protected", "Protected"],
      ["Base private", "Not directly accessible"],
    ],
  },

  protected: {
    title: "Protected Inheritance",

    description:
      "Protected inheritance makes public and protected members of the base class protected in the derived class.",

    example: "class Dog : protected Animal",

    visibility: [
      ["Base public", "Protected"],
      ["Base protected", "Protected"],
      ["Base private", "Not directly accessible"],
    ],
  },

  private: {
    title: "Private Inheritance",

    description:
      "Private inheritance makes public and protected members of the base class private in the derived class.",

    example: "class Dog : private Animal",

    visibility: [
      ["Base public", "Private"],
      ["Base protected", "Private"],
      ["Base private", "Not directly accessible"],
    ],
  },
};

/* =====================================================
   CONSTRUCTOR DATA
===================================================== */

const constructorData = {
  rules: [
    {
      number: "01",
      title: "Same Name as Class",
      text: "The constructor has the same name as the class.",
    },
    {
      number: "02",
      title: "No Return Type",
      text: "A constructor has no return type, not even void.",
    },
    {
      number: "03",
      title: "Usually Public",
      text: "Constructors are usually declared in the public section.",
    },
    {
      number: "04",
      title: "Automatically Called",
      text: "The constructor is automatically called when an object is created.",
    },
  ],

  basicCode: `#include <iostream>
using namespace std;

class Student {
public:
    Student() {
        cout << "Constructor called";
    }
};

int main() {
    Student s;

    return 0;
}`,

  parameterCode: `#include <iostream>
using namespace std;

class Student {
public:
    Student(string n, int a) {
        cout << "Name: " << n << endl;
        cout << "Age: " << a << endl;
    }
};

int main() {
    Student s("Rahul", 20);

    return 0;
}`,

  overloadCode: `#include <iostream>
using namespace std;

class Student {
public:

    Student() {
        cout << "Default Constructor" << endl;
    }

    Student(string name) {
        cout << "Name: " << name << endl;
    }
};

int main() {
    Student s1;
    Student s2("Rahul");

    return 0;
}`,

  outsideCode: `#include <iostream>
using namespace std;

class Student {
public:
    Student();
};

Student::Student() {
    cout << "Constructor called";
}

int main() {
    Student s;

    return 0;
}`,
};

/* =====================================================
   PROTECTED ROUTE
===================================================== */

function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

/* =====================================================
   SIGN IN PAGE
===================================================== */

function SignInPage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div className="auth-loading">Loading...</div>;
  }

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-background"></div>

      <div className="auth-wrapper">
        <div className="auth-brand">
          <div className="auth-logo">C++</div>

          <div>
            <strong>C++ Learning Lab</strong>
            <span>Interactive programming playground</span>
          </div>
        </div>

        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/"
        />
      </div>
    </div>
  );
}

/* =====================================================
   SIGN UP PAGE
===================================================== */

function SignUpPage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div className="auth-loading">Loading...</div>;
  }

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-background"></div>

      <div className="auth-wrapper">
        <div className="auth-brand">
          <div className="auth-logo">C++</div>

          <div>
            <strong>C++ Learning Lab</strong>
            <span>Interactive programming playground</span>
          </div>
        </div>

        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/"
        />
      </div>
    </div>
  );
}

/* =====================================================
   SIDEBAR NAVIGATION ITEM
===================================================== */

function SidebarItem({
  active,
  icon,
  title,
  subtitle,
  onClick,
}) {
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="sidebar-item-icon">{icon}</span>

      <span className="sidebar-item-content">
        <strong>{title}</strong>

        {subtitle && <small>{subtitle}</small>}
      </span>

      <span className="sidebar-item-arrow">›</span>
    </button>
  );
}

/* =====================================================
   VISUALIZER
===================================================== */

function Visualizer() {
  const types = Object.keys(inheritanceData);

  const [selectedType, setSelectedType] =
    useState("Single");

  const [showCode, setShowCode] =
    useState(true);

  const [running, setRunning] =
    useState(false);

  const [animation, setAnimation] =
    useState(false);

  const [output, setOutput] =
    useState([]);

  const [accessType, setAccessType] =
    useState("public");

  const [selectedNode, setSelectedNode] =
    useState(null);

  const current =
    inheritanceData[selectedType];

  const access =
    accessData[accessType];

  const currentIndex =
    types.indexOf(selectedType);

  /* =====================================================
     SCROLL
  ===================================================== */

  const scrollToSection = (id) => {
    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  /* =====================================================
     SELECT TYPE
  ===================================================== */

  const selectType = (type) => {
    setSelectedType(type);
    setOutput([]);
    setSelectedNode(null);
    setAnimation(false);
    setRunning(false);
  };

  /* =====================================================
     NEXT
  ===================================================== */

  const handleNext = () => {
    const nextIndex =
      (currentIndex + 1) % types.length;

    selectType(types[nextIndex]);

    scrollToSection("inheritance-section");
  };

  /* =====================================================
     PREVIOUS
  ===================================================== */

  const handlePrevious = () => {
    const prevIndex =
      (currentIndex - 1 + types.length) %
      types.length;

    selectType(types[prevIndex]);

    scrollToSection("inheritance-section");
  };

  /* =====================================================
     RUN
  ===================================================== */

  const handleRun = () => {
    if (running) return;

    setRunning(true);
    setOutput([]);

    let index = 0;

    const timer = setInterval(() => {
      setOutput((prev) => [
        ...prev,
        current.output[index],
      ]);

      index++;

      if (index >= current.output.length) {
        clearInterval(timer);
        setRunning(false);
      }
    }, 650);
  };

  /* =====================================================
     RESET
  ===================================================== */

  const handleReset = () => {
    setOutput([]);
    setRunning(false);
    setAnimation(false);
    setSelectedNode(null);
    setShowCode(true);
  };

  /* =====================================================
     ANIMATION
  ===================================================== */

  const handleAnimation = () => {
    setAnimation(false);

    setTimeout(() => {
      setAnimation(true);
    }, 50);
  };

  return (
    <div className="app">

      {/* =================================================
          TOP HEADER
      ================================================= */}

      <header className="top-header">

        <Link to="/" className="brand">

          <div className="brand-mark">
            C++
          </div>

          <div className="brand-text">
            <strong>C++ Learning Lab</strong>
            <span>Interactive OOP Playground</span>
          </div>

        </Link>

        <div className="header-center">
          <span className="header-status-dot"></span>
          Interactive Learning Environment
        </div>

        <div className="header-actions">

          <Link
            to="/feedback"
            target="_blank"
            rel="noopener noreferrer"
            className="header-feedback"
          >
            <span>💬</span>
            Feedback
          </Link>

          <div className="header-user">
            <UserButton />
          </div>

        </div>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="workspace">

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="learning-sidebar">

          <div className="sidebar-heading">

            <div>
              <span className="eyebrow">
                LEARNING PATH
              </span>

              <h2>C++ OOP</h2>
            </div>


          </div>

          {/* FUNDAMENTALS */}

          <div className="sidebar-group">

            <div className="sidebar-group-title">
              Fundamentals
            </div>

            <SidebarItem
              icon="▣"
              title="Class & Object"
              subtitle="C++ fundamentals"
              onClick={() =>
                scrollToSection(
                  "class-object-section"
                )
              }
            />

            <SidebarItem
              icon="◇"
              title="Constructors"
              subtitle="Object initialization"
              onClick={() =>
                scrollToSection(
                  "constructor-section"
                )
              }
            />

          </div>

          {/* INHERITANCE */}

          <div className="sidebar-group">

            <div className="sidebar-group-title">
              Inheritance
            </div>

            {types.map((type, index) => (

              <SidebarItem
                key={type}
                active={
                  selectedType === type
                }
                icon={
                  index === 0
                    ? "↳"
                    : index === 1
                    ? "⇣"
                    : index === 2
                    ? "⊕"
                    : index === 3
                    ? "⑂"
                    : "◇"
                }
                title={type}
                subtitle={
                  type === "Single"
                    ? "One base → one derived"
                    : type === "Multilevel"
                    ? "Chain inheritance"
                    : type === "Multiple"
                    ? "Multiple base classes"
                    : type === "Hierarchical"
                    ? "One base → many"
                    : "Combined inheritance"
                }
                onClick={() => {
                  selectType(type);
                  scrollToSection(
                    "inheritance-section"
                  );
                }}
              />

            ))}

          </div>

          {/* ACCESS */}

          <div className="sidebar-group">

            <div className="sidebar-group-title">
              Access Specifiers
            </div>

            {Object.keys(accessData).map(
              (type) => (

                <SidebarItem
                  key={type}
                  active={
                    accessType === type
                  }
                  icon={
                    type === "public"
                      ? "🌐"
                      : type === "protected"
                      ? "◈"
                      : "🔒"
                  }
                  title={
                    type.charAt(0).toUpperCase() +
                    type.slice(1)
                  }
                  subtitle={
                    type === "public"
                      ? "Accessible interface"
                      : type === "protected"
                      ? "Family access"
                      : "Restricted access"
                  }
                  onClick={() => {
                    setAccessType(type);
                    scrollToSection(
                      "access-section"
                    );
                  }}
                />

              )
            )}

          </div>

          <div className="sidebar-bottom">

            <div className="sidebar-tip">

              <span className="tip-icon">
                💡
              </span>

              <div>
                <strong>Learning tip</strong>

                <p>
                  Click a class in the diagram
                  to inspect it.
                </p>
              </div>

            </div>

            <Link
              to="/feedback"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-feedback"
            >
              <span>💬</span>
              Send Feedback
            </Link>
              {/* ABOUT US */}
  <a
    href="/about"
    target="_blank"
    rel="noopener noreferrer"
    className="sidebar-about"
  >
    👨‍💻 About Us
  </a>

          </div>

        </aside>

        {/* =================================================
            CONTENT
        ================================================= */}

        <main className="learning-content">

          {/* =================================================
              PAGE INTRO
          ================================================= */}

          <section className="page-intro">

            <div>

              <span className="intro-label">
                C++ OBJECT ORIENTED PROGRAMMING
              </span>

              <h1>
                Understand OOP
                <span> visually.</span>
              </h1>

              <p>
                Explore classes, objects, constructors,
                inheritance and access specifiers through
                interactive examples.
              </p>

            </div>

            <div className="intro-decoration">
              <div className="code-symbol">
                {"{ }"}
              </div>

              <div className="floating-dot dot-one"></div>
              <div className="floating-dot dot-two"></div>
              <div className="floating-dot dot-three"></div>
            </div>

          </section>

          {/* =================================================
              CLASS AND OBJECT
          ================================================= */}

          <section
            id="class-object-section"
            className="learning-section"
          >

            <div className="section-heading">

              <div className="section-number">
                01
              </div>

              <div>
                <span className="section-kicker">
                  FUNDAMENTALS
                </span>

                <h2>
                  Class & Object
                </h2>

                <p>
                  A class is a blueprint for objects,
                  while an object is an instance of a class.
                </p>
              </div>

            </div>

            <div className="fundamental-grid">

              <article className="learning-card concept-card">

                <div className="concept-top">

                  <span className="concept-icon">
                    ◫
                  </span>

                  <span className="concept-tag">
                    BLUEPRINT
                  </span>

                </div>

                <h3>Class</h3>

                <p>
                  A class defines the data and functions
                  that objects created from it will contain.
                </p>

                <pre>
{`class Student {
public:
    string name;

    void display() {
        cout << name;
    }
};`}
                </pre>

              </article>

              <article className="learning-card concept-card">

                <div className="concept-top">

                  <span className="concept-icon">
                    ●
                  </span>

                  <span className="concept-tag">
                    INSTANCE
                  </span>

                </div>

                <h3>Object</h3>

                <p>
                  An object is an instance of a class
                  that can access its available members.
                </p>

                <pre>
{`int main() {

    Student s;

    s.name = "Rahul";

    s.display();

    return 0;
}`}
                </pre>

              </article>

            </div>

          </section>

          {/* =================================================
              CONSTRUCTORS
          ================================================= */}

          <section
            id="constructor-section"
            className="learning-section"
          >

            <div className="section-heading">

              <div className="section-number">
                02
              </div>

              <div>
                <span className="section-kicker">
                  FUNDAMENTALS
                </span>

                <h2>
                  Constructors
                </h2>

                <p>
                  Special member functions that are
                  automatically called when objects are created.
                </p>
              </div>

            </div>

            {/* RULES */}

            <div className="learning-card constructor-main">

              <div className="subsection-heading">
                <div>
                  <span className="mini-label">
                    CORE CONCEPT
                  </span>

                  <h3>
                    Constructor Rules
                  </h3>
                </div>
              </div>

              <div className="rules-grid">

                {constructorData.rules.map(
                  (rule) => (

                    <div
                      className="rule-card"
                      key={rule.number}
                    >

                      <div className="rule-number">
                        {rule.number}
                      </div>

                      <div>
                        <h4>
                          {rule.title}
                        </h4>

                        <p>
                          {rule.text}
                        </p>
                      </div>

                    </div>

                  )
                )}

              </div>

              <div className="info-banner">

                <div className="info-icon">
                  💡
                </div>

                <div>

                  <strong>
                    Why are constructors useful?
                  </strong>

                  <p>
                    Constructors initialize objects at
                    creation time and make it easier to
                    assign initial values to data members.
                  </p>

                </div>

              </div>

            </div>

            {/* CODE EXAMPLES */}

            <div className="example-stack">

              <div className="learning-card code-example-card">

                <div className="code-example-header">

                  <div>
                    <span>
                      EXAMPLE 01
                    </span>

                    <h3>
                      Basic Constructor
                    </h3>
                  </div>

                  <div className="code-language">
                    C++
                  </div>

                </div>

                <pre>
                  <code>
                    {constructorData.basicCode}
                  </code>
                </pre>

              </div>

              <div className="learning-card code-example-card">

                <div className="code-example-header">

                  <div>
                    <span>
                      EXAMPLE 02
                    </span>

                    <h3>
                      Parameterized Constructor
                    </h3>
                  </div>

                  <div className="code-language">
                    C++
                  </div>

                </div>

                <pre>
                  <code>
                    {constructorData.parameterCode}
                  </code>
                </pre>

              </div>

              <div className="learning-card code-example-card">

                <div className="code-example-header">

                  <div>
                    <span>
                      EXAMPLE 03
                    </span>

                    <h3>
                      Constructor Overloading
                    </h3>
                  </div>

                  <div className="code-language">
                    C++
                  </div>

                </div>

                <pre>
                  <code>
                    {constructorData.overloadCode}
                  </code>
                </pre>

              </div>

              <div className="learning-card code-example-card">

                <div className="code-example-header">

                  <div>
                    <span>
                      EXAMPLE 04
                    </span>

                    <h3>
                      Constructor Outside Class
                    </h3>
                  </div>

                  <div className="code-language">
                    C++
                  </div>

                </div>

                <pre>
                  <code>
                    {constructorData.outsideCode}
                  </code>
                </pre>

              </div>

            </div>

          </section>

          {/* =================================================
              INHERITANCE
          ================================================= */}

          <section
            id="inheritance-section"
            className="inheritance-section"
          >

            <div className="inheritance-heading">

              <div>

                <span className="section-kicker">
                  INTERACTIVE PLAYGROUND
                </span>

                <h2>
                  {selectedType} Inheritance
                </h2>

                <p>
                  {current.description}
                </p>

              </div>

              <div className="inheritance-badge">
                <span></span>
                Interactive
              </div>

            </div>

            {/* CONTROLS */}

            <div className="playground-controls">

              <button
                className="control-button secondary"
                onClick={handlePrevious}
              >
                <span>←</span>
                Previous
              </button>

              <button
                className="control-button secondary"
                onClick={handleNext}
              >
                Next
                <span>→</span>
              </button>

              <button
                className="control-button animate-button"
                onClick={handleAnimation}
              >
                <span>▶</span>
                Animate
              </button>

              <button
                className="control-button reset-button"
                onClick={handleReset}
              >
                <span>↻</span>
                Reset
              </button>

            </div>

            {/* DIAGRAM + CODE */}

            <div className="playground-grid">

              {/* DIAGRAM */}

              <div className="playground-card">

                <div className="playground-card-header">

                  <div>
                    <span className="card-kicker">
                      VISUALIZATION
                    </span>

                    <h3>
                      Inheritance Diagram
                    </h3>
                  </div>

                  <span className="class-count">
                    {current.diagram.length} Classes
                  </span>

                </div>

                <div
                  className={
                    animation
                      ? "inheritance-diagram animated"
                      : "inheritance-diagram"
                  }
                >

                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="diagram-lines"
                  >

                    <defs>

                      <marker
                        id="arrow-head"
                        markerWidth="7"
                        markerHeight="7"
                        refX="5"
                        refY="3.5"
                        orient="auto"
                      >
                        <path
                          d="M0,0 L7,3.5 L0,7 Z"
                          fill="currentColor"
                        />
                      </marker>

                    </defs>

                    {current.arrows.map(
                      ([from, to], index) => {

                        const start =
                          current.diagram.find(
                            (node) =>
                              node.id === from
                          );

                        const end =
                          current.diagram.find(
                            (node) =>
                              node.id === to
                          );

                        if (!start || !end) {
                          return null;
                        }

                        return (
                          <line
                            key={index}
                            x1={start.x}
                            y1={start.y + 9}
                            x2={end.x}
                            y2={end.y - 9}
                            stroke="currentColor"
                            strokeWidth="0.65"
                            markerEnd="url(#arrow-head)"
                          />
                        );
                      }
                    )}

                  </svg>

                  {current.diagram.map(
                    (node) => (

                      <button
                        key={node.id}
                        className={
                          selectedNode === node.id
                            ? "diagram-node selected"
                            : "diagram-node"
                        }
                        style={{
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                        }}
                        onClick={() =>
                          setSelectedNode(node.id)
                        }
                      >

                        <span className="node-letter">
                          {node.id}
                        </span>

                        <span className="node-label">
                          {node.label}
                        </span>

                        <span className="node-sub">
                          {node.sub}
                        </span>

                      </button>

                    )
                  )}

                </div>

                {selectedNode && (

                  <div className="selected-node-info">

                    <div className="selected-node-icon">
                      {selectedNode}
                    </div>

                    <div>
                      <span>
                        SELECTED CLASS
                      </span>

                      <strong>
                        Class {selectedNode}
                      </strong>
                    </div>

                    <button
                      onClick={() =>
                        setSelectedNode(null)
                      }
                    >
                      ×
                    </button>

                  </div>

                )}

              </div>

              {/* CODE */}

              <div className="playground-card code-playground">

                <div className="playground-card-header">

                  <div>
                    <span className="card-kicker">
                      CODE EDITOR
                    </span>

                    <h3>
                      C++ Example
                    </h3>
                  </div>

                  <button
                    className="code-toggle"
                    onClick={() =>
                      setShowCode(!showCode)
                    }
                  >
                    {showCode
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {showCode && (

                  <>

                    <div className="code-window">

                      <div className="code-window-bar">

                        <div className="window-dots">
                          <i></i>
                          <i></i>
                          <i></i>
                        </div>

                        <span>
                          main.cpp
                        </span>

                        <span className="cpp-label">
                          C++
                        </span>

                      </div>

                      <pre>
                        <code>
                          {current.code}
                        </code>
                      </pre>

                    </div>

                    <button
                      className="run-example"
                      onClick={handleRun}
                      disabled={running}
                    >
                      {running ? (
                        <>
                          <span className="run-spinner"></span>
                          Running...
                        </>
                      ) : (
                        <>
                          <span>▶</span>
                          Run Example
                        </>
                      )}
                    </button>

                  </>

                )}

                <div className="terminal">

                  <div className="terminal-header">

                    <span>
                      OUTPUT
                    </span>

                    <span className="terminal-status">
                      ● Ready
                    </span>

                  </div>

                  <div className="terminal-body">

                    {output.length === 0 ? (

                      <span className="terminal-placeholder">
                        Run the example to see the output...
                      </span>

                    ) : (

                      output.map(
                        (line, index) => (

                          <div
                            className="terminal-line"
                            key={index}
                          >
                            <span>
                              $
                            </span>

                            {line}
                          </div>

                        )
                      )

                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* HOW IT WORKS */}

            <div className="how-it-works">

              <div className="how-heading">

                <div>
                  <span className="card-kicker">
                    CONCEPT
                  </span>

                  <h3>
                    How Inheritance Works
                  </h3>
                </div>

              </div>

              <div className="how-grid">

                <div className="how-card">

                  <span className="how-number">
                    01
                  </span>

                  <div>
                    <h4>
                      Base Class
                    </h4>

                    <p>
                      The parent class contains common
                      properties and functions.
                    </p>
                  </div>

                </div>

                <div className="how-card">

                  <span className="how-number">
                    02
                  </span>

                  <div>
                    <h4>
                      Inheritance
                    </h4>

                    <p>
                      The derived class receives accessible
                      members from the base class.
                    </p>
                  </div>

                </div>

                <div className="how-card">

                  <span className="how-number">
                    03
                  </span>

                  <div>
                    <h4>
                      Derived Class
                    </h4>

                    <p>
                      The child class can add its own
                      data and member functions.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              ACCESS SPECIFIER
          ================================================= */}

          <section
            id="access-section"
            className="learning-section"
          >

            <div className="section-heading">

              <div className="section-number">
                03
              </div>

              <div>

                <span className="section-kicker">
                  ACCESS CONTROL
                </span>

                <h2>
                  Access Specifiers
                </h2>

                <p>
                  Control how inherited members are exposed
                  inside a derived class.
                </p>

              </div>

            </div>

            <div className="learning-card access-main">

              <div className="access-top">

                <div>

                  <span className="access-pill">
                    {accessType.toUpperCase()}
                  </span>

                  <h3>
                    {access.title}
                  </h3>

                  <p>
                    {access.description}
                  </p>

                </div>

                <code>
                  {access.example}
                </code>

              </div>

              <div className="access-options">

                {Object.keys(accessData).map(
                  (type) => (

                    <button
                      key={type}
                      className={
                        accessType === type
                          ? "access-option active"
                          : "access-option"
                      }
                      onClick={() => {
                        setAccessType(type);
                      }}
                    >

                      <span>
                        {type === "public"
                          ? "🌐"
                          : type === "protected"
                          ? "◈"
                          : "🔒"}
                      </span>

                      <strong>
                        {type.charAt(0).toUpperCase() +
                          type.slice(1)}
                      </strong>

                    </button>

                  )
                )}

              </div>

              <div className="visibility-table">

                <div className="visibility-header">
                  <span>
                    Base Member
                  </span>

                  <span>
                    Derived Class
                  </span>
                </div>

                {access.visibility.map(
                  ([from, to]) => (

                    <div
                      className="visibility-row"
                      key={from}
                    >

                      <span>
                        {from}
                      </span>

                      <span className={
                        `visibility-value ${to
                          .toLowerCase()
                          .replaceAll(" ", "-")}`
                      }>
                        {to}
                      </span>

                    </div>

                  )
                )}

              </div>

              <div className="access-note">

                <span>💡</span>

                <p>
                  {access.description}
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              SYNTAX
          ================================================= */}

          <section className="learning-section">

            <div className="section-heading">

              <div className="section-number">
                04
              </div>

              <div>

                <span className="section-kicker">
                  QUICK REFERENCE
                </span>

                <h2>
                  Inheritance Syntax
                </h2>

                <p>
                  The basic syntax used to create a derived
                  class in C++.
                </p>

              </div>

            </div>

            <div className="learning-card syntax-main">

              <div className="syntax-code">

                <div className="syntax-code-header">
                  <span>
                    C++
                  </span>

                  <span>
                    Basic Syntax
                  </span>
                </div>

                <pre>
{`class DerivedClass : access_specifier BaseClass {

    // members of derived class

};`}
                </pre>

              </div>

              <div className="syntax-examples">

                <div>
                  <span>PUBLIC</span>

                  <code>
                    class Dog : public Animal {};
                  </code>
                </div>

                <div>
                  <span>PROTECTED</span>

                  <code>
                    class Dog : protected Animal {};
                  </code>
                </div>

                <div>
                  <span>PRIVATE</span>

                  <code>
                    class Dog : private Animal {};
                  </code>
                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="learning-footer">

            <div>
              <strong>
                C++ Learning Lab
              </strong>

              <span>
                Interactive OOP Visualizer
              </span>
            </div>

            <Link
              to="/feedback"
              target="_blank"
              rel="noopener noreferrer"
            >
              Send Feedback →
            </Link>

          </footer>

        </main>

      </div>

    </div>
  );
}

/* =====================================================
   APP
===================================================== */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/sign-in/*"
          element={<SignInPage />}
        />

        <Route
          path="/sign-up/*"
          element={<SignUpPage />}
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Visualizer />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
