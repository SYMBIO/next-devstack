@import "../../styles/mixins/responsive";

.wrapper {
  grid-column: 1 / span 6;
  margin-top: 2rem;

  @include from-tablet {
    grid-column: 1 / span 12;
  }

  @include from-desktop {
    grid-column: 1 / span 16;
    margin-top: 4rem;
  }
}
