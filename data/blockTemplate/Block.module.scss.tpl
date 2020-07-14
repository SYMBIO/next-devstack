@import "../../styles/mixins/responsive";

.wrapper {
  grid-column: 1 / span 6;
  margin-top: 2rem;

  @include sm-md {
    grid-column: 1 / span 12;
  }

  @include md-min {
    grid-column: 1 / span 16;
    margin-top: 4rem;
  }
}
